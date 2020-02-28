import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerActions, PlayerFacade } from './player';
import { filter } from 'rxjs/operators';
import { PlayerService } from './player/service/player.service';

@Component({
  selector: 'f2020-root',
  templateUrl:"app.component.html"
})
export class AppComponent implements OnInit {

  constructor(private facade: PlayerFacade, private router: Router, private playerService: PlayerService) {

  }

  ngOnInit() {
    this.facade.dispatch(PlayerActions.loadPlayer());
    this.facade.unauthorized$.pipe(
      filter(unauthorized => unauthorized),
    ).subscribe(() => this.router.navigate(['login']));
  }

  signOut() {
    this.playerService.signOut();
  }

}
