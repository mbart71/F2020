import { AuthenticationService } from './../firebase/service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'f2020-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private service: AuthenticationService) {}

  loginWithGoogle() {
    this.service.signInWithGoogle();
  }

}
