import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Player } from '@f2020/data';
import { PlayersActions, PlayersFacade } from '@f2020/players';
import { Observable, pipe, fromEvent } from 'rxjs';
import { filter, pluck, tap, withLatestFrom } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DepositDialogComponent } from '../deposit-dialog/deposit-dialog.component';

const isTruthy = <T> () => pipe(filter((a: T) => !!a));

@Component({
  selector: 'f2020-player-transactions',
  template: `
  <mat-toolbar color="primary" *ngIf="player$ | async as player">
    <span fxFlex>{{player?.displayName}}</span><span>{{player?.balance | currency: 'DKK'}}</span>
  </mat-toolbar>
  <f2020-transactions fxFlex [player]="player$ | async"></f2020-transactions>
  <mat-toolbar fxLayoutAlign="space-between" *ngIf="player$ | async as player">
    <button mat-button fxFlex (click)="openDeposit(player)">Indsæt</button>
    <button mat-button fxFlex>Hæv</button>
    <button mat-button fxFlex>Overfør</button>
  </mat-toolbar>
  `
})
export class PlayerTransactionsComponent implements OnInit {

  player$: Observable<Player>;

  constructor(
    private facade: PlayersFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      pluck<Params, string>('uid')
    ).subscribe(uid => this.facade.dispatch(PlayersActions.selectPlayer({ uid })));
    this.player$ = this.facade.selectedPlayer$.pipe(
      isTruthy(),
    );
  }

  openDeposit(player: Player) {
    // [mat-dialog-close]="data.animal"
    const dialogRef = this.dialog.open(DepositDialogComponent, {
      width: '250px',
      data: { player }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
