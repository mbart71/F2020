import { Component, OnInit } from '@angular/core';
import { PlayersFacade, PlayersActions } from '@f2020/api';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class PlayersComponent implements OnInit {

  constructor(private facade: PlayersFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(PlayersActions.loadPlayers());
  }

}
