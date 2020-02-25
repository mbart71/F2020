import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './firebase/service/authentication.service';
import { PlayerFacade, PlayerActions } from './player';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'f2020-root',
  templateUrl:"app.component.html"
})
export class AppComponent implements OnInit {

  constructor(private facade: PlayerFacade, private router: Router) {

  }

  ngOnInit() {
    this.facade.dispatch(PlayerActions.loadPlayer());
    this.facade.unauthorized$.pipe(
      filter(unauthorized => unauthorized),
    ).subscribe(() => this.router.navigate(['login'])); 
  }

  signOut() {
    // this.service.signOut();
  }

}
