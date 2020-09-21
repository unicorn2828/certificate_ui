import {Component, OnInit} from '@angular/core';
import {RegistrationService} from './registration.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../_model/user.model';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public loginForm: FormGroup;
  private login: string;
  private password: string;
  private confirmPassword: string;
  private email: string;
  private user: User;

  constructor(public registrationService: RegistrationService,
              public loginService: LoginService,
  ) {
  }

  onSubmit(): void {
    this.login = this.loginForm.get('login').value;
    this.password = this.loginForm.get('password').value;
    this.confirmPassword = this.loginForm.get('confirmPassword').value;
    this.email = this.loginForm.get('email').value;
    this.registrationService.userRegistration(this.login, this.password, this.confirmPassword, this.email).subscribe(data => {
      this.user = data;
    });
    setTimeout(() => {
      this.loginService.logIn(this.login, this.password);
    }, 1500);
  }

  resetForm(): void {
    this.loginForm.reset({
      login: '',
      password: '',
      confirmPassword: '',
      email: ''
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(this.login, [
        Validators.required,
        Validators.minLength(5)]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(5)]),
      confirmPassword: new FormControl(this.confirmPassword, [
        Validators.required,
        Validators.minLength(5)]),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email])
    });
  }
  get name(): AbstractControl { return this.loginForm.get('login'); }
  get name2(): AbstractControl { return this.loginForm.get('password'); }
  get name3(): AbstractControl { return this.loginForm.get('confirmPassword'); }
  get name4(): AbstractControl { return this.loginForm.get('email'); }
}
