import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string;
  role: string;
  public userCart: number[] = [];
  cart = localStorage.getItem('userCart');

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkTokenExpiration();
    if (localStorage.getItem('sub') !== null) {
      this.user = localStorage.getItem('sub');
      this.role = localStorage.getItem('role');
    }
    if (this.cart !== undefined && this.cart !== null) {
      this.userCart = JSON.parse(localStorage.getItem('userCart'));
    }
  }

  logout(): void {
    localStorage.clear();
    this.user = undefined;
    this.role = undefined;
    this.router.navigateByUrl('/home');
  }

  checkTokenExpiration(): boolean {
    const exp = localStorage.getItem('exp');
    if (Number(exp) < Date.now() / 1000) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
