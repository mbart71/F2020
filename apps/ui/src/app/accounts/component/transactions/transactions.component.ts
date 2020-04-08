import { DataSource } from '@angular/cdk/table';
import { Transaction } from '@f2020/data';
import { TransactionsActionsComponent } from './../transactions-actions/transactions-actions.component';
import { filter, map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlayerFacade } from './../../../player';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AccountService, TransactionsDataSource } from '../../service';

@Component({
  selector: 'f2020-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  balance$: Observable<number>
  dataSource: DataSource<Transaction | undefined>;

  constructor(private facade: PlayerFacade, private bottomSheet: MatBottomSheet, private service: AccountService) { }

  ngOnInit(): void {
    this.facade.player$.pipe(
      filter(player => !!player),
      first()
    ).subscribe(player => this.dataSource = new TransactionsDataSource(player.uid, this.service));
    this.balance$ = this.facade.player$.pipe(
      filter(player => !!player),
      map(player => player.balance)
    );
  }

  openActions() {
    this.bottomSheet.open(TransactionsActionsComponent);
  }

}
