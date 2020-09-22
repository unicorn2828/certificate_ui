import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: string;
  public role: string;
  public userCart: number[] = [];
  public cart = localStorage.getItem('userCart');

  @Input() userCartLength: number;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.checkTokenExpiration();
    if (localStorage.getItem('sub') !== null) {
      this.user = localStorage.getItem('sub');
      this.role = localStorage.getItem('role');
    }
    if (this.cart !== undefined && this.cart !== null) {
      this.userCart = JSON.parse(localStorage.getItem('userCart'));
      this.userCartLength = this.userCart.length;
    }
  }

  public logout(): void {
    localStorage.clear();
    this.user = undefined;
    this.role = undefined;
    this.router.navigateByUrl('/home');
  }

  public checkTokenExpiration(): boolean {
    const exp = localStorage.getItem('exp');
    if (Number(exp) < Date.now() / 1000) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
