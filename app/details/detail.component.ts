import {Component, OnInit} from '@angular/core';
import {DetailService} from './detail.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Certificate} from '../_model/certificate.model';
import {UpdateService} from '../update/update.service';

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public certificateId: number;
  public certificate: Certificate;
  public user: string;
  public role: string;

  constructor(public detailsService: DetailService,
              private updateService: UpdateService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
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

  update(): void {
    const url = '/update';
    this.router.navigate([url, this.certificateId]);
  }

  delete(): void {
    this.updateService.deleteCertificate(this.certificateId).subscribe((response) => {
      console.log('deleted'); });
    setTimeout(() => {
      this.router.navigateByUrl('/certificates');
    }, 1000);
  }
}
