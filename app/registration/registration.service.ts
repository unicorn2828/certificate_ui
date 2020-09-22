import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from '../_model/user.model';

const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class RegistrationService {
  public user: User;
  readonly url = 'http://localhost:8070/users/signup';

  constructor(private http: HttpClient) {
  }

  public userRegistration(login, password, confirmPassword, email): Observable<User> {
    const data = JSON.stringify({login, password, confirmPassword, email});
    return this.http.post<User>(this.url, data, options).pipe(tap(user =>
      this.user = user));
  }
}
