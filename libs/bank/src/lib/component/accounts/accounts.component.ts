import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayersFacade, PlayersActions } from '@f2020/players';

@Component({
  selector: 'f2020-accounts',
  template: '<router-outlet></router-outlet>',
})
export class AccountsComponent implements OnInit, OnDestroy {

  constructor(private facade: PlayersFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(PlayersActions.loadPlayers());
  }

  ngOnDestroy() {
    this.facade.dispatch(PlayersActions.unloadPlayers());
  }
}
