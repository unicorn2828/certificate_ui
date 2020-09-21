import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {CertificatesService} from './certificates.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Certificates} from '../_model/certificate.model';
import {MatPaginator} from '@angular/material/paginator';
import {CartComponent} from '../cart/cart.component';
import {Tags} from '../_model/tag.model';

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

  constructor(public certificateService: CertificatesService,
              public cartComponent: CartComponent) {
  }

  @Input() tagName: string;
  @Input() certificateName: Certificates;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  certificatesForm = new FormGroup({
    certificateName: new FormControl()
  });

  resetForm(): void {
    this.certificatesForm.reset({
      certificateName: ''
    });
  }

  ngOnInit(): void {
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

  findByCertificateName(certificateName): void {
    this.certificateService.getCertificates(this.pageIndex, this.pageSize, certificateName).subscribe(data => {
      this.certificateService.certificates = data.certificates;
    });
  }


  findByTagName(tagName): void {
    this.certificateService.getCertificatesByTag(tagName).subscribe(data => {
      this.certificateService.certificates = data.certificates;
    });
  }


  getPaginatorData(event): void {
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

  putInCart(id: number): void {
    const userCart = localStorage.getItem('userCart');
    const empty = userCart !== undefined && userCart !== null;
    this.putInCartNext(id, empty);
  }

  putInCartNext(id: number, cartStatus: boolean): void {
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
