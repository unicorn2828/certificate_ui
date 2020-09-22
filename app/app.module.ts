import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CartComponent} from './cart/cart.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {OrderComponent} from './order/order.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DetailComponent} from './details/detail.component';
import {UserInfoComponent} from './user/user-info.component';
import {HttpErrorInterceptor} from './error/http-error.interceptor';
import {CertificatesComponent} from './certificates/certificates.component';
import {RegistrationComponent} from './registration/registration.component';
import {AddCertificateComponent} from './certificates/add/add-certificate.component';
import {UpdateCertificateComponent} from './certificates/update/update-certificate.component';

const appRoutes: Routes = [
  {path: 'update-certificate/:id', component: UpdateCertificateComponent},
  {path: 'add-certificate', component: AddCertificateComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'certificates', component: CertificatesComponent},
  {path: 'certificates/:id', component: DetailComponent},
  {path: 'logout', component: CertificatesComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'order-info', component: OrderComponent},
  {path: '**', component: CertificatesComponent},
  {path: '', component: CertificatesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  declarations: [
    UpdateCertificateComponent,
    AddCertificateComponent,
    CertificatesComponent,
    RegistrationComponent,
    UserInfoComponent,
    DetailComponent,
    NavbarComponent,
    OrderComponent,
    LoginComponent,
    CartComponent,
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
