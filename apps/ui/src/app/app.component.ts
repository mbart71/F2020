import { Component } from '@angular/core';
import { AuthenticationService } from './firebase/service/authentication.service';

@Component({
  selector: 'f2020-root',
  templateUrl:"app.component.html"
})
export class AppComponent {

  constructor(private service: AuthenticationService) {

  }

  signOut() {
    this.service.signOut();
  }

}
