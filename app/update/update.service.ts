import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Certificate} from '../_model/certificate.model';



@Injectable({providedIn: 'root'})
export class UpdateService {
  public certificate: Certificate;

  readonly url = 'http://localhost:8070/certificates';

  constructor(private http: HttpClient) {
  }


  updateCertificate(certificateId, certificateName, description, creationDate, price, duration): Observable<Certificate> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token')})
    };
    const data = JSON.stringify({certificateName, description, creationDate, price, duration});
    const url = `${this.url}/${certificateId}`;
    return this.http.put<Certificate>(url, data, options).pipe(tap(certificate => this.certificate = certificate));
  }

  deleteCertificate(certificateId): Observable<any> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token')})
    };
    const url = `${this.url}/${certificateId}`;
    console.log(url);
    return this.http.delete(url, options).pipe(tap(data => data));
  }
}
