import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {CertificatesComponent} from './certificates/certificates.component';
import {RegistrationComponent} from './registration/registration.component';
import {DetailComponent} from './details/detail.component';
import {HttpErrorInterceptor} from './error/http-error.interceptor';
import {UserComponent} from './user/user.component';
import {UpdateComponent} from './update/update.component';
import {CartComponent} from './cart/cart.component';
import {AdminComponent} from './admin/admin.component';

const appRoutes: Routes = [
  {path: '', component: CertificatesComponent},
  {path: 'certificates', component: CertificatesComponent},
  {path: 'certificates/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'logout', component: CertificatesComponent},
  {path: 'home', component: CertificatesComponent},
  {path: 'user', component: UserComponent},
  {path: 'update/:id', component: UpdateComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent},
  {path: '**', component: CertificatesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    CertificatesComponent,
    RegistrationComponent,
    DetailComponent,
    UserComponent,
    UpdateComponent,
    CartComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule
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
