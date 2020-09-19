import {Component, Injectable, OnInit} from '@angular/core';
import {DetailService} from '../details/detail.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Certificate} from '../_model/certificate.model';

@Component({
  selector: 'app-details',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
@Injectable({providedIn: 'root'})
export class UserComponent implements OnInit {
  public certificate: Certificate;
  public certificates: Certificate[] = [];
  public user: string;
  public role: string;
  public userCart: number[];

  constructor(private detailService: DetailService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userCart = JSON.parse(localStorage.getItem('userCart'));
    if (localStorage.getItem('sub') !== null) {
      this.user = localStorage.getItem('sub');
      if (this.userCart.length !== 0) {
        for (const id of this.userCart) {
          this.detailService.getCertificate(id).subscribe(data => this.certificates.push(data));
        }
      }
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
    this.router.navigate(['/user']);
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
    this.router.navigate(['/certificates']);
  }

  confirm(): void {
  }
}
