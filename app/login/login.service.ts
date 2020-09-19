import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {JWT, Token} from '../_model/jwt.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class LoginService {
  private token: Token;
  private userCart: [];
  readonly url = 'http://localhost:8070/users/login';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  loginForm = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  });

  resetForm(): void {
    this.loginForm.reset({
      login: '',
      password: ''
    });
  }

  getToken(login, password): Observable<Token> {
    const data = JSON.stringify({login, password});
    return this.http.post<Token>(this.url, data, options).pipe(tap(token =>
      this.token = token));
  }


  logIn(login: string, password: string): void {
    this.getToken(login, password).subscribe(data => this.setToken(data));
  }

  setToken(token: Token): void {
    const jwtData = token.token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const jwt: JWT = JSON.parse(decodedJwtJsonData);
    localStorage.setItem('role', jwt.role.toString());
    localStorage.setItem('sub', token.sub);
    localStorage.setItem('exp', token.exp);
    localStorage.setItem('token', token.token);
    console.log(localStorage.getItem('token'));
    this.router.navigateByUrl('/home');
  }
}
