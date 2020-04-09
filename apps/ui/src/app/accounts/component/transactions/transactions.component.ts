import { DataSource } from '@angular/cdk/table';
import { Transaction } from '@f2020/data';
import { TransactionsActionsComponent } from './../transactions-actions/transactions-actions.component';
import { filter, map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlayerFacade } from './../../../player';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AccountService, TransactionsDataSource } from '../../service';
import { transition } from '@angular/animations';

@Component({
  selector: 'f2020-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  balance$: Observable<number>
  dataSource: DataSource<Transaction | undefined>;
  uid: string;

  constructor(private facade: PlayerFacade, private bottomSheet: MatBottomSheet, private service: AccountService) { }

  ngOnInit(): void {
    this.facade.player$.pipe(
      filter(player => !!player),
      first()
    ).subscribe(player => {
      this.uid = player.uid;
      this.dataSource = new TransactionsDataSource(player.uid, this.service)
    });
    this.balance$ = this.facade.player$.pipe(
      filter(player => !!player),
      map(player => player.balance)
    );
  }

  openActions() {
    this.bottomSheet.open(TransactionsActionsComponent);
  }

  amount(transaction: Transaction): number {
    return transaction.to === this.uid ? transaction.amount : - transaction.amount;
  }

}
