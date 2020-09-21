import {Component, Injectable, OnInit} from '@angular/core';
import {Certificate} from '../_model/certificate.model';
import {CertificatesService} from '../certificates/certificates.service';
import {Order, Orders} from '../_model/order.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
@Injectable({providedIn: 'root'})
export class UserComponent implements OnInit {
  public orders: Orders = undefined;
  public order: Order;
  public certificate: Certificate;
  public certificates: Certificate[] = [];
  public user: string;
  public role: string;

  constructor(private certificatesService: CertificatesService) {
  }

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    this.certificatesService.getUserOrders(id).subscribe(data => {
      this.orders = data;
      console.log(this.orders.orders);
    });
  }
}
