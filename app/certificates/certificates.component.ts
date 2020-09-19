import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CertificatesService} from './certificates.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Certificates} from '../_model/certificate.model';
import {MatPaginator} from '@angular/material/paginator';
import {UserComponent} from '../user/user.component';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  public user: string;
  public role: string;
  public pageIndex = 1;
  public pageSize = 10;
  private userCart: [number];

  constructor(public certificateService: CertificatesService,
              public userComponent: UserComponent) {
  }

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
    this.certificateService.getCertificates(this.pageIndex, this.pageSize, null).subscribe(data => {
      this.certificateService.certificates = data.certificates;
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
    console.log(empty);
    this.userComponent.putInCart(id, empty);
  }
}
