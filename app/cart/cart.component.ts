import {CertificatesService} from '../certificates/certificates.service';
import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailService} from '../details/detail.service';
import {Certificate} from '../_model/certificate.model';
import {Booking} from '../_model/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
@Injectable({providedIn: 'root'})
export class CartComponent implements OnInit {
  public certificates: Certificate[] = [];
  public certificate: Certificate;
  public userCart: number[];
  public booking: Booking;
  public userCartLength;
  public user: string;
  public role: string;

  constructor(private certificatesService: CertificatesService,
              private detailService: DetailService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.userCart = JSON.parse(localStorage.getItem('userCart'));
    if (localStorage.getItem('sub') !== null) {
      this.user = localStorage.getItem('sub');
      if (this.userCart !== null && this.userCart.length !== 0) {
        for (const id of this.userCart) {
          this.detailService.getCertificate(id).subscribe(data => this.certificates.push(data));
        }
      }
      if (localStorage.getItem('userCart') === null) {
        this.userCartLength = 0;
      } else {
        this.userCartLength = Number(localStorage.getItem('userCart'));
      }
    }
  }

  public delete(id: number): void {
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

  public confirm(): void {
    const idList: string[] = [];
    for (const cer of this.certificates) {
      idList.push(String(cer.id));
    }
    localStorage.removeItem('userCart');
    this.certificatesService.makeOrder(idList).subscribe(data => {
      this.router.navigateByUrl('/order-info');
    });
  }
}
