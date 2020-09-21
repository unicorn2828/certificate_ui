import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Certificate} from '../_model/certificate.model';
import {CertificatesService} from '../certificates/certificates.service';
import {Order, Orders} from '../_model/order.model';
import {AdminService} from './admin.service';
import {User} from '../_model/user.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Tags} from '../_model/tag.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
@Injectable({providedIn: 'root'})
export class AdminComponent implements OnInit {
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

  constructor(public adminService: AdminService,
              public certificatesService: CertificatesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(this.userId, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/)])
    });
    this.user.login = '';
    this.user.email = '';
  }

  onSubmit(): void {
    const id = this.userForm.get('id').value;
    this.adminService.findUserById(id).subscribe(data => {
      this.user = data;
    });
    console.log(this.user.orders);
    this.adminService.getWidelyTag(id).subscribe(data => {
        this.tags = data.tags;
      }
    );
    this.certificatesService.getUserOrders(id).subscribe(data => {
      this.orders = data;
    });
  }

// findUser(userId): void {
//   this.adminService.findUserById(userId).subscribe(data => {
//     this.user = data;
//   });
//   this.adminService.getWidelyTag(userId).subscribe(data => {
//     this.tags = data;
//   });
//   console.log(this.tags);
//   this.login = this.user.login;
//   this.email = this.user.email;
//   this.orders = this.user.orders;
// }

  resetForm(): void {
    this.userForm.reset({
      login: '',
      password: ''
    });
  }
}
