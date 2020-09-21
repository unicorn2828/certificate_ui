import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Certificate, Certificates} from '../_model/certificate.model';
import {Booking, Order, Orders} from '../_model/order.model';
import {Tags} from '../_model/tag.model';

const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token')})
};
const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({providedIn: 'root'})
export class CertificatesService {
  public tags: Tags;
  public orders: Orders;
  public order: Order;
  public certificates: Certificate[] = [];

  constructor(private http: HttpClient) {
  }

  getCertificates(pageNumber: number, pageSize: number, certificateName: string): Observable<Certificates> {
    const url = 'http://localhost:8070/certificates';
    let params;
    if (certificateName === null) {
      params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());
    } else {
      params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('certificateName', certificateName);
    }
    return this.http.get<Certificates>(url, {headers, params})
      .pipe(tap(data => this.certificates = data.certificates));
  }

  getCertificatesByTag(tagName: string): Observable<Certificates> {
    const url = 'http://localhost:8070/certificates';
    const params = new HttpParams()
      .set('pageNumber', '1')
      .set('pageSize', '10')
      .set('tagName', tagName);
    return this.http.get<Certificates>(url, {headers, params})
      .pipe(tap(data => this.certificates = data.certificates));
  }

  public getCount(): Observable<number> {
    const url = 'http://localhost:8070/certificates/count';
    return this.http.get<number>(url, {headers})
      .pipe(tap(data => data));
  }

  public getUserOrders(id): Observable<Orders> {
    const apiUrl = 'http://localhost:8070/users';
    const url = `${apiUrl}/${id}/orders`;
    return this.http.get<Orders>(url, options)
      .pipe(tap(data => this.orders = data));
  }

  public makeOrder(certificates: string[]): Observable<Order> {
    const url = 'http://localhost:8070/orders';
    const data = JSON.stringify({certificates});
    localStorage.removeItem('userCart');
    return this.http.post<Order>(url, data, options).pipe(tap(order => this.order = order));
  }

  getTags(): Observable<Tags> {
    const url = 'http://localhost:8070/tags';
    const params = new HttpParams()
      .set('pageNumber', '1')
      .set('pageSize', '100');
    const option = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params
    };
    return this.http.get<Tags>(url, option)
      .pipe(tap(data => this.tags = data));
  }
}
