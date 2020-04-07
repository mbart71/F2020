import { TransactionsActionsComponent } from './../transactions-actions/transactions-actions.component';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlayerFacade } from './../../../player';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'f2020-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  balance$: Observable<number>

  constructor(private facade: PlayerFacade, private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.balance$ = this.facade.player$.pipe(
      filter(player => !!player),
      map(player => player.balance)
    );
  }

  openActions() {
    this.bottomSheet.open(TransactionsActionsComponent);
  }

}
