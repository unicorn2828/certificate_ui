import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UpdateService} from './update.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DetailService} from '../details/detail.service';
import {Certificate} from '../_model/certificate.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private certificateId: number;
  private certificateName: string;
  private description: string;
  private creationDate: string;
  private price: string;
  private duration: string;
  public certificate: Certificate;

  constructor(public updateService: UpdateService,
              private detailsService: DetailService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  updateForm = new FormGroup({
    certificateName: new FormControl(),
    description: new FormControl(),
    creationDate: new FormControl(),
    price: new FormControl(),
    duration: new FormControl()
  });

  resetForm(): void {
    this.updateForm.reset({
      certificateName: '',
      description: '',
      creationDate: '',
      price: '',
      duration: '',
    });
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.certificateId = +params.id;
        }
      );
    this.detailsService
      .getCertificate(this.certificateId)
      .subscribe(data => {
        this.certificate = data;
      });
    setTimeout(() => {
      this.updateForm.reset({
        certificateName: this.certificate.certificateName,
        description: this.certificate.description,
        creationDate: this.certificate.creationDate.toString(),
        price: this.certificate.price.toString(),
        duration: this.certificate.duration.toString()
      });
    }, 1500);
  }

  updateCertificate(): void {
    this.certificateName = this.updateForm.get('certificateName').value;
    this.description = this.updateForm.get('description').value;
    this.creationDate = this.updateForm.get('creationDate').value;
    this.price = this.updateForm.get('price').value;
    this.duration = this.updateForm.get('duration').value;
    this.updateService.updateCertificate(this.certificateId,
      this.certificateName, this.description,
      this.creationDate, this.price, this.duration).subscribe(data => this.certificate = data);
    setTimeout(() => {
      this.goTo();
    }, 1000);
  }

  goTo(): void {
    const url = '/certificates';
    this.router.navigate([url, this.certificateId]);
  }
}
