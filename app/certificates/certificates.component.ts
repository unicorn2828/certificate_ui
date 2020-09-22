import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {CertificatesService} from './certificates.service';
import {Certificates} from '../_model/certificate.model';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
@Injectable({providedIn: 'root'})
export class CertificatesComponent implements OnInit {
  public user: string;
  public role: string;
  public length = 100;
  public pageIndex = 1;
  public pageSize = 10;
  public userCartLength = 0;
  public userCart: number[];

  constructor(public certificateService: CertificatesService) {
  }

  @Input() tagName: string;
  @Input() certificateName: Certificates;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  certificatesForm = new FormGroup({
    certificateName: new FormControl()
  });

  public resetForm(): void {
    this.certificatesForm.reset({
      certificateName: ''
    });
  }

  public ngOnInit(): void {
    this.certificateService.getCount().subscribe(data => {
      this.length = data;
    });
    this.certificateService.getCertificates(this.pageIndex, this.pageSize, null).subscribe(data => {
      this.certificateService.certificates = data.certificates;
    });
    this.certificateService.getTags().subscribe(data => {
      this.certificateService.tags = data;
    });
    if (localStorage.getItem('sub') !== null) {
      this.user = localStorage.getItem('sub');
      this.role = localStorage.getItem('role');
    }
    this.getPaginatorData(null);
  }

  public findByCertificateName(certificateName): void {
    this.certificateService.getCertificates(this.pageIndex, this.pageSize, certificateName).subscribe(data => {
      this.certificateService.certificates = data.certificates;
    });
  }

  public findByTagName(tagName): void {
    this.certificateService.getCertificatesByTag(tagName).subscribe(data => {
      this.certificateService.certificates = data.certificates;
    });
  }

  public getPaginatorData(event): void {
    if (event === null || event.pageIndex === 0) {
      this.pageIndex = 1;
    } else {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
    }
    this.certificateService.getCertificates(this.pageIndex, this.pageSize, null).subscribe(data => {
      this.certificateService.certificates = data.certificates;
    });
  }

  public putInCart(id: number): void {
    const userCart = localStorage.getItem('userCart');
    const empty = userCart !== undefined && userCart !== null;
    this.putInCartNext(id, empty);
  }

  public  putInCartNext(id: number, cartStatus: boolean): void {
    if (!cartStatus) {
      this.userCart = new Array();
    } else {
      this.userCart = JSON.parse(localStorage.getItem('userCart'));
    }
    this.userCart.push(id);
    localStorage.setItem('userCart', JSON.stringify(this.userCart));
    this.userCartLength = this.userCart.length;
  }
}
