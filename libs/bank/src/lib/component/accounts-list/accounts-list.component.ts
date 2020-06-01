import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PlayersFacade } from '@f2020/api';
import { Player } from '@f2020/data';

@Component({
  selector: 'f2020-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  players$: Observable<Player[]>

  constructor(private facade: PlayersFacade) { }

  ngOnInit(): void {
    this.players$ = this.facade.allPlayers$;
  }

}
