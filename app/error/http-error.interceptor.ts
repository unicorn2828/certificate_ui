import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {CustomError} from '../_model/error.model';

export class HttpErrorInterceptor implements HttpInterceptor {
error: CustomError;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        this.error = error.error;
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${this.error.errorMessage}`;
        } else {
          errorMessage = `Error Code: ${this.error.errorCode}\nMessage: ${this.error.errorMessage}`;
        }
        window.alert(this.error.errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
