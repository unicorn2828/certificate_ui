import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Certificate, Certificates} from '../_model/certificate.model';


@Injectable({providedIn: 'root'})
export class CertificatesService {
  public certificates: Certificate[] = [];
  readonly apiUrl = 'http://localhost:8070/certificates';

  constructor(private http: HttpClient) {
  }

  getCertificates(pageNumber: number, pageSize: number, certificateName: string): Observable<Certificates> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let params;
    if (certificateName === null) {
      params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());
    } else {
      params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('certificateName', certificateName);
    }
    return this.http.get<Certificates>(this.apiUrl, {headers, params})
      .pipe(tap(data => this.certificates = data.certificates));
  }
}
