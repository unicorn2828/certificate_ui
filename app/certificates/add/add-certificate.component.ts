import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateCertificateService} from '../update/update-certificate.service';
import {Certificate} from '../../_model/certificate.model';
import {DetailService} from '../../details/detail.service';
import {Tag} from '../../_model/tag.model';


@Component({
  selector: 'app-add',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.css']
})
export class AddCertificateComponent implements OnInit {
  public certificate: Certificate;
  private certificateName: string;
  private certificateId: number;
  private description: string;
  private tag: Tag = new Tag();
  private tags = new Array();
  public userCartLength = 0;
  private duration: string;
  private price: string;

  constructor(public updateService: UpdateCertificateService,
              private detailsService: DetailService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  addForm = new FormGroup({
    certificateName: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    duration: new FormControl(),
    tag: new FormControl()
  });

  public resetForm(): void {
    this.addForm.reset({
      certificateName: '',
      description: '',
      price: '',
      duration: '',
      tag: ''
    });
  }

  public ngOnInit(): void {
  }

  public addCertificate(): void {
    window.document.querySelector('#error').innerHTML = '';
    this.certificateName = this.addForm.get('certificateName').value;
    this.description = this.addForm.get('description').value;
    this.price = this.addForm.get('price').value;
    this.duration = this.addForm.get('duration').value;
    this.tag.tagName = '';
    this.tag.tagName = this.addForm.get('tag').value;
    this.tags.push(this.tag);
    this.tags.slice(0, 1);
    this.updateService.addCertificate(this.certificateId, this.certificateName, this.description,
      this.price, this.duration, this.tags).subscribe(data => this.certificate = data);
    setTimeout(() => {
      this.goTo();
    }, 1800);
  }

  public goTo(): void {
    const url = '/certificates';
    this.router.navigate([url, this.certificate.id]);
  }
}
