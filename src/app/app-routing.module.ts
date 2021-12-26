import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Role} from "./models/role";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AppointmentsListingPageComponent} from "./components/appointments-listing-page/appointments-listing-page.component";
import {AppointmentsByClientListingPageComponent} from "./components/appointments-by-client-listing-page/appointments-by-client-listing-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'appointments-listing',
    component: AppointmentsListingPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Psychologist] }
  },
  {
    path: 'appointments-by-client-listing',
    component: AppointmentsByClientListingPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Client] }
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },

  { path: '', redirectTo: 'login' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
