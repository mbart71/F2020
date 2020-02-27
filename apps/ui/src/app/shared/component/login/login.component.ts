import { Component } from '@angular/core';
import { AuthenticationService } from '../../../firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'f2020-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private service: AuthenticationService, private router: Router) {
  }

  loginWithGoogle() {
    this.router.navigate(['/']).then(() => this.service.signInWithGoogle());
  }

}
