import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '@f2020/player'

@Component({
  selector: 'sha-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private service: PlayerService, private router: Router) {
  }

  loginWithGoogle() {
    this.router.navigate(['/']).then(() => this.service.signInWithGoogle());
  }

  loginWithFacebook() {
    this.router.navigate(['/']).then(() => this.service.signInWithFacebook());
  }

}
