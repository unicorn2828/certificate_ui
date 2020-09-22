import {Component, Injectable, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({providedIn: 'root'})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private password: string;
  private login: string;

  constructor(public loginService: LoginService) {
  }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(this.login, [
        Validators.required,
        Validators.minLength(5)]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(5)])
    });
  }
  get name(): AbstractControl { return this.loginForm.get('login'); }
  get name2(): AbstractControl { return this.loginForm.get('password'); }

  public resetForm(): void {
    this.loginForm.reset({
      login: '',
      password: ''
    });
  }

  public onSubmit(): void {
    this.loginService.logIn(this.loginForm.get('login').value, this.loginForm.get('password').value);
  }
}
