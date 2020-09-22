import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Certificate} from '../_model/certificate.model';
import {Tags} from '../_model/tag.model';
import {User} from '../_model/user.model';

const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token')})
};

@Injectable({providedIn: 'root'})
export class UserInfoService {
  public tags: Tags;
  public user: User;
  public certificates: Certificate[] = [];

  constructor(private http: HttpClient) {
  }

  public findUserById(id: number): Observable<User> {
    const apiUrl = 'http://localhost:8070/users';
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url, options)
      .pipe(tap(data => this.user = data));
  }

  public findUserByName(userName: string): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token')});
    const url = 'http://localhost:8070/users/user/info';
    const params = new HttpParams()
      .set('userName', userName);
    return this.http.get<User>(url, {headers, params})
      .pipe(tap(data => this.user = data));
  }

  public getWidelyTag(id: number): Observable<Tags> {
    const widely = 'widelytag';
    const apiUrl = 'http://localhost:8070/users';
    const url = `${apiUrl}/${id}/${widely}`;
    return this.http.get<Tags>(url, options)
      .pipe(tap(data => this.tags = data));
  }
}
