import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Certificate} from '../_model/certificate.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class DetailService {
  public certificate: Certificate;
  readonly apiUrl = 'http://localhost:8070/certificates';

  constructor(private http: HttpClient) {
  }

  public getCertificate(id: number): Observable<Certificate> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Certificate>(url, httpOptions)
      .pipe(tap(certificate => this.certificate = certificate));
  }
}
