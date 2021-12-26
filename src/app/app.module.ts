import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppointmentsListingPageComponent } from './components/appointments-listing-page/appointments-listing-page.component';
import { AppointmentsByClientListingPageComponent } from './components/appointments-by-client-listing-page/appointments-by-client-listing-page.component';
import {dataProvider} from "./helpers/data.interceptor";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AppointmentsListingPageComponent,
    AppointmentsByClientListingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    Ng2OrderModule
  ],
  providers: [dataProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
