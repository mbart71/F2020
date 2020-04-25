import { AccountService } from './../../service';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'f2020-transactions-actions',
  templateUrl: './transactions-actions.component.html',
  styleUrls: ['./transactions-actions.component.scss']
})
export class TransactionsActionsComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<TransactionsActionsComponent>,
    private service: AccountService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  withdraw() {
    this.service.withdraw(100, 'Test knap - hævning')
      .then(() => this.snackBar.open('Hævnings lykkes', null, {duration: 5000}))
      .catch(error => this.snackBar.open(error['stack'] || error, null, {duration: 5000}))
      .finally(() => this.bottomSheetRef.dismiss());
  }

  deposit() {
    this.service.deposit(100, 'Test knap - indsætning')
      .then(() => this.snackBar.open('Indsætning lykkes', null, {duration: 5000}))
      .catch(error => this.snackBar.open(error['stack'] || error, null, {duration: 5000}))
      .finally(() => this.bottomSheetRef.dismiss());
  }

}
