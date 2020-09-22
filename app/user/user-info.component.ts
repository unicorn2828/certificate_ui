import {Component, Injectable, Input, OnInit} from '@angular/core';
import {CertificatesService} from '../certificates/certificates.service';
import {Orders} from '../_model/order.model';
import {UserInfoService} from './user-info.service';
import {User} from '../_model/user.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
@Injectable({providedIn: 'root'})
export class UserInfoComponent implements OnInit {
  public orders: Orders = new Orders();
  public userCartLength = 0;
  public tags: any[] = [];
  public user: User = new User();
  public login: string;
  public email: string;
  public userForm: FormGroup;
  public userId: number;

  get id(): AbstractControl {
    return this.userForm.get('id');
  }

  constructor(public userInfoService: UserInfoService,
              public certificatesService: CertificatesService) {
  }

  public ngOnInit(): void {
    const pattern = '^[a-z0-9]+$';
    this.userForm = new FormGroup({
      id: new FormControl(this.userId, [
        Validators.required,
        Validators.pattern(pattern),
        Validators.minLength(1)])
    });
    this.user.login = '';
    this.user.email = '';
    if (localStorage.getItem('userCart') === null) {
      this.userCartLength = 0;
    } else {
      this.userCartLength = Number(localStorage.getItem('userCart'));
    }
  }

  public onSubmit(): void {
    const id = this.userForm.get('id').value;
    if (!isNaN(id)) {
      this.getUserInfo(id);
    } else {
      this.userInfoService.findUserByName(id).subscribe(data => {
        this.user = data;
        this.getUserInfo(data.id);
      });
    }
  }

  public getUserInfo(id: number): void {
    this.userInfoService.findUserById(id).subscribe(data => {
      this.user = data;
    });
    this.userInfoService.getWidelyTag(id).subscribe(data => {
        this.tags = data.tags;
      }
    );
    this.certificatesService.getUserOrders(id).subscribe(data => {
      this.orders = data;
    });
  }

  public resetForm(): void {
    this.userForm.reset({
      id: ''
    });
    const element = window.document.getElementById('error');
    element.innerHTML = '';
  }
}
