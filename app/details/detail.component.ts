import {Component, OnInit} from '@angular/core';
import {DetailService} from './detail.service';
import {Certificate} from '../_model/certificate.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UpdateCertificateService} from '../certificates/update/update-certificate.service';

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public userCartLength = 0;
  public certificateId: number;
  public certificate: Certificate;
  public user: string;
  public role: string;
  public userCart: number[];

  constructor(public detailsService: DetailService,
              private updateService: UpdateCertificateService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.certificateId = +params.id;
        }
      );
    this.detailsService
      .getCertificate(this.certificateId)
      .subscribe(data => {
        this.certificate = data;
      });
    if (localStorage.getItem('sub') !== null) {
      this.user = localStorage.getItem('sub');
      this.role = localStorage.getItem('role');
    }
  }

  public update(): void {
    const url = '/update-certificate';
    this.router.navigate([url, this.certificateId]);
  }

  public delete(): void {
    this.updateService.deleteCertificate(this.certificateId).subscribe((response) => {
      console.log('deleted'); });
    setTimeout(() => {
      this.router.navigateByUrl('/certificates');
    }, 1000);
  }

  public putInCart(id: number): void {
    const userCart = localStorage.getItem('userCart');
    const empty = userCart !== undefined && userCart !== null;
    this.putInCartNext(id, empty);
  }

  private putInCartNext(id: number, cartStatus: boolean): void {
    if (!cartStatus) {
      this.userCart = new Array();
    } else {
      this.userCart = JSON.parse(localStorage.getItem('userCart'));
    }
    this.userCart.push(id);
    localStorage.setItem('userCart', JSON.stringify(this.userCart));
    this.userCartLength = this.userCart.length;
  }
}
