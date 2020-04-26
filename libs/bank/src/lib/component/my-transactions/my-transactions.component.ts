import { DepositInfoDialogComponent } from './deposit-info-dialog/deposit-info-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Player } from '@f2020/data';
import { PlayerFacade } from '@f2020/player';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'f2020-my-transactions',
  template: `
  <mat-toolbar color="primary">
    <span fxFlex>Saldo</span>
    <ng-container *ngIf="player$ | async as player">
      <button mat-icon-button (click)="showInfo()"><mat-icon fontSet="far" fontIcon="fa-piggy-bank"></mat-icon></button>
      <span>{{player.balance | currency: 'DKK'}}</span>
    </ng-container>
  </mat-toolbar>
  <f2020-transactions fxFlex [player]="player$ | async"></f2020-transactions>
  `,
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit {

  player$: Observable<Player>;

  constructor(private facade: PlayerFacade, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.player$ = this.facade.player$.pipe(
      filter(player => !!player),
      untilDestroyed(this),
    );
  }

  showInfo() {
    this.dialog.open(DepositInfoDialogComponent)
  }
}
