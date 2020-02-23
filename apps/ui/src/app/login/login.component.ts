import { Observable } from 'rxjs';
import { AuthenticationService } from './../firebase/service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'f2020-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: Observable<firebase.User>


  constructor(private service: AuthenticationService) {}

  ngOnInit() {
    this.user$ = this.service.user$;
  }

  loginWithGoogle() {
    this.service.signInWithGoogle();
  }

}
