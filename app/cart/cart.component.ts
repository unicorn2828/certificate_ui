import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailService} from '../details/detail.service';
import {Certificate, Certificates} from '../_model/certificate.model';
import {CertificatesService} from '../certificates/certificates.service';
import {Booking} from '../_model/order.model';
import {CertificatesComponent} from '../certificates/certificates.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
@Injectable({providedIn: 'root'})
export class CartComponent implements OnInit {
  public certificate: Certificate;
  public certificates: Certificate[] = [];
  public user: string;
  public role: string;
  public userCart: number[];
  public booking: Booking;
  public userCartLength;

  constructor(private detailService: DetailService,
              private certificatesService: CertificatesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userCart = JSON.parse(localStorage.getItem('userCart'));
    if (localStorage.getItem('sub') !== null) {
      this.user = localStorage.getItem('sub');
      if (this.userCart !== null && this.userCart.length !== 0) {
        for (const id of this.userCart) {
          this.detailService.getCertificate(id).subscribe(data => this.certificates.push(data));
        }
      }
      console.log(this.userCart === null || this.userCart.length === 0);
    }
  }

  putInCart(id: number, cartStatus: boolean): void {
    if (!cartStatus) {
      this.userCart = new Array();
    } else {
      this.userCart = JSON.parse(localStorage.getItem('userCart'));
    }
    this.userCart.push(id);
    localStorage.setItem('userCart', JSON.stringify(this.userCart));
    this.userCartLength = this.userCart.length;
  }

  delete(id: number): void {
    let index;
    if (this.userCart.length !== 0) {
      this.userCart.forEach((value, i) => {
        if (value === id) {
          index = i;
        }
      });
      if (index !== undefined) {
        this.userCart.splice(index, 1);
        localStorage.setItem('userCart', JSON.stringify(this.userCart));
      }
    }
    this.userCartLength = this.userCart.length;
    this.router.navigate(['/cart'])
      .then(() => {
        window.location.reload();
      });
  }

  confirm(): void {
    console.log(this.certificates);
    const idList: string[] = [];
    for (const cer of this.certificates) {
      idList.push(String(cer.id));
    }
    this.certificatesService.makeOrder(idList).subscribe(data => {
      this.ngOnInit();
    });
  }
}
