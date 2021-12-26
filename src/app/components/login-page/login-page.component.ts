import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username! : string ;
  password! : string ;
  error : boolean = false;

  constructor(private authenticationService: AuthenticationService)
  {}

  ngOnInit(): void {
  }


  login() {
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          if(this.username == 'psy'){
            window.location.href='/appointments-listing';
          }
          if(this.username == 'client'){
            window.location.href='/appointments-by-client-listing';
          }
        },
        error => {
          this.error = true;
        });
  }
}
