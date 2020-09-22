import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Certificate} from '../../_model/certificate.model';
import {DetailService} from '../../details/detail.service';
import {UpdateCertificateService} from './update-certificate.service';
import {Tag} from '../../_model/tag.model';


@Component({
  selector: 'app-update',
  templateUrl: './update-certificate.component.html',
  styleUrls: ['./update-certificate.component.css']
})
export class UpdateCertificateComponent implements OnInit {
  public userCartLength = 0;
  private certificateId: number;
  private certificateName: string;
  private description: string;
  private creationDate: string;
  private price: string;
  private duration: string;
  private tag: Tag = new Tag();
  private tags = new Array();
  public certificate: Certificate;

  constructor(public updateService: UpdateCertificateService,
              private detailsService: DetailService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  updateForm = new FormGroup({
    certificateName: new FormControl(),
    description: new FormControl(),
    creationDate: new FormControl(),
    price: new FormControl(),
    duration: new FormControl(),
    tag: new FormControl()
  });

  public resetForm(): void {
    this.updateForm.reset({
      certificateName: '',
      description: '',
      creationDate: '',
      price: '',
      duration: '',
      tag: ''
    });
  }

  public ngOnInit(): void {
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
    }, 1500);
    setTimeout(() => {
      if (this.certificate.tags.length > 0) {
        this.tag = this.certificate.tags[0];
      }
      this.updateForm.reset({
        certificateName: this.certificate.certificateName,
        description: this.certificate.description,
        creationDate: this.certificate.creationDate.toString(),
        price: this.certificate.price.toString(),
        duration: this.certificate.duration.toString(),
        tag: this.tag.tagName
      });
      console.log(this.certificate.tags);
    }, 1500);
  }

  public updateCertificate(): void {
    window.document.querySelector('#error').innerHTML = '';
    this.certificateName = this.updateForm.get('certificateName').value;
    this.description = this.updateForm.get('description').value;
    this.creationDate = this.updateForm.get('creationDate').value;
    this.price = this.updateForm.get('price').value;
    this.duration = this.updateForm.get('duration').value;
    this.tag.tagName = '';
    this.tag.tagName = this.updateForm.get('tag').value;
    this.tags.push(this.tag);
    this.updateService.updateCertificate(this.certificateId, this.certificateName, this.description,
      this.creationDate, this.price, this.duration, this.tags).subscribe(data => this.certificate = data);
    setTimeout(() => {
      this.goTo();
    }, 1500);
  }

  public goTo(): void {
    const url = '/certificates';
    this.router.navigate([url, this.certificateId]);
  }
}
