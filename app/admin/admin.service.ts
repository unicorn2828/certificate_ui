import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Certificate, Certificates} from '../_model/certificate.model';
import {Booking, Order, Orders} from '../_model/order.model';
import {Tags} from '../_model/tag.model';
import {User} from '../_model/user.model';

const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token')})
};
const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({providedIn: 'root'})
export class AdminService {
  public tags: Tags;
  public user: User;
  public certificates: Certificate[] = [];

  constructor(private http: HttpClient) {
  }

  findUserById(id: number): Observable<User> {
    const apiUrl = 'http://localhost:8070/users';
    const url = `${apiUrl}/${id}`;
    console.log(url);
    return this.http.get<User>(url, options)
      .pipe(tap(data => this.user = data));
  }

  getWidelyTag(id: number): Observable<Tags> {
    const widely = 'widelytag';
    const apiUrl = 'http://localhost:8070/users';
    const url = `${apiUrl}/${id}/${widely}`;
    return this.http.get<Tags>(url, options)
      .pipe(tap(data => this.tags = data));
  }
}
