import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlayerFacade } from './../../../player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'f2020-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  balance$: Observable<number>

  constructor(private facade: PlayerFacade) { }

  ngOnInit(): void {
    this.balance$ = this.facade.player$.pipe(
      filter(player => !!player),
      map(player => player.balance)
    );
  }

}
