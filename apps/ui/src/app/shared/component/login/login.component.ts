import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../firebase';

@Component({
  selector: 'f2020-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  player$: Observable<firebase.UserInfo>


  constructor(private service: AuthenticationService) {}

  ngOnInit() {
  }

  loginWithGoogle() {
    this.service.signInWithGoogle();
  }

}
