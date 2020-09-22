import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Certificate} from '../../_model/certificate.model';
import {Tag} from '../../_model/tag.model';

const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token')})
};

@Injectable({providedIn: 'root'})
export class UpdateCertificateService {
  readonly url = 'http://localhost:8070/certificates';
  public certificate: Certificate;
  public currentTag: Tag;

  constructor(private http: HttpClient) {
  }

  public addCertificate(certificateId, certificateName, description, price, duration, tags): Observable<Certificate> {
    const data = JSON.stringify({certificateName, description, price, duration, tags});
    const url = `${this.url}`;
    return this.http.post<Certificate>(url, data, options).pipe(tap(certificate => this.certificate = certificate));
  }

  public updateCertificate(certificateId, certificateName, description, creationDate, price, duration, tags): Observable<Certificate> {
    this.currentTag = tags[0];
    let data;
    if (this.currentTag.tagName === null){
      data = JSON.stringify({certificateName, description, creationDate, price, duration});
    } else{
      data = JSON.stringify({certificateName, description, creationDate, price, duration, tags});
    }
    const url = `${this.url}/${certificateId}`;
    return this.http.put<Certificate>(url, data, options).pipe(tap(certificate => this.certificate = certificate));
  }

  public deleteCertificate(certificateId): Observable<any> {
    const url = `${this.url}/${certificateId}`;
    return this.http.delete(url, options).pipe(tap(data => data));
  }
}
