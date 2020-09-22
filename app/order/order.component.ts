import {Component, Injectable, OnInit} from '@angular/core';
import {Certificate} from '../_model/certificate.model';
import {CertificatesService} from '../certificates/certificates.service';
import {Order, Orders} from '../_model/order.model';

@Component({
  selector: 'app-user',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
@Injectable({providedIn: 'root'})
export class OrderComponent implements OnInit {
  public userCartLength = 0;
  public orders: Orders = undefined;
  public order: Order;
  public certificate: Certificate;
  public certificates: Certificate[] = [];
  public user: string;
  public role: string;

  constructor(private certificatesService: CertificatesService) {
  }

  public ngOnInit(): void {
    const id = localStorage.getItem('userId');
    this.certificatesService.getUserOrders(id).subscribe(data => {
      this.orders = data;
      console.log(this.orders.orders);
    });
    if (localStorage.getItem('userCart') === null) {
      this.userCartLength = 0;
    } else {
      console.log(localStorage.getItem('userCart'));
      this.userCartLength = Number(localStorage.getItem('userCart'));
    }
  }
}
