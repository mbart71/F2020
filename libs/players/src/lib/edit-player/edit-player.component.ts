import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { PlayersActions, PlayersApiService, PlayersFacade } from '@f2020/api';
import { Player, Role } from '@f2020/data';
import { truthy } from '@f2020/tools';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { first, pluck, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  player$: Observable<Player>;
  fg: FormGroup;
  accountAndNames = accountAndNames;

  constructor(
    private facade: PlayersFacade,
    private route: ActivatedRoute,
    private playerService: PlayersApiService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      roles: this.fb.group({
        player: [],
        admin: [],
        bankAdmin: []
      }),
      migration: [],
    });
    this.player$ = this.facade.selectedPlayer$;
    this.route.params.pipe(
      pluck<Params, string>('id'),
      untilDestroyed(this),
    ).subscribe(uid => this.facade.dispatch(PlayersActions.selectPlayer({ uid })));
    this.player$.pipe(
      truthy(),
      first()
    ).subscribe(player => {
      this.fg.get('roles').patchValue({
        player: player.roles.includes('player'),
        admin: player.roles.includes('admin'),
        bankAdmin: player.roles.includes('bank-admin'),
      })
    })
  }

  updateRoles() {
    const value = Object.values(this.fg.get('roles').value);
    const roles: Role[] = (['player', 'admin', 'bank-admin'] as Role[]).filter((_, index) => value[index]);
    this.player$.pipe(
      first(),
      switchMap(player => this.playerService.updatePlayer(player.uid, { roles: roles.length ? roles: ['anonymous'] })),
    ).subscribe(() => this.snackBar.open('Roller opdateret', null, { duration: 2000 }));
  }

  migrateAccount() {
    const accountId = this.fg.get('migration').value;
    if (accountId) {
      this.player$.pipe(
        first(),
        switchMap(player => this.playerService.migrateAccount(player.uid, accountId)),
      ).subscribe(() => this.snackBar.open('Migrering afsluttet', null, { duration: 2000 }));
    }
  }

}

const accountAndNames = [
  { id: 1, name: 'Flemming Bregnvig' },
  { id: 4, name: 'My Bookie' },
  { id: 8, name: 'Michael Bartrup' },
  { id: 9, name: 'Thomas Trebbien Pedersen' },
  { id: 10, name: 'Peter Thorup' },
  { id: 11, name: 'Niels-Henrik Rasmussen' },
  { id: 12, name: 'Thomas Knudsen' },
  { id: 13, name: 'Palle Bregnvig' },
  { id: 15, name: 'Morten Mathiesen' },
  { id: 17, name: 'Thorbjørn Larsen' },
  { id: 19, name: 'Jesper Dalsten' },
  { id: 21, name: 'Mogens Højte' },
  { id: 23, name: 'Nino Stokbro Ag' },
  { id: 26, name: 'Anne-Sofie Bregnvig' },
  { id: 27, name: 'Christian Rusche' },
  { id: 30, name: 'Jacob Andersen' },
  { id: 31, name: 'Stefan Trabolt' },
  { id: 32, name: 'Jette Hansen' },
  { id: 33, name: 'Claus Jessing' },
  { id: 34, name: 'Katrine Jensen' },
  { id: 35, name: 'Morten Laier' },
  { id: 36, name: 'Michael Heide' },
  { id: 37, name: 'Henrik Aakjær' },
  { id: 38, name: 'Kåre Pedersen' },
  { id: 39, name: 'Steffen Larsen' },
  { id: 40, name: 'Søren Bruun' },
  { id: 41, name: 'Michael Weile' },
  { id: 42, name: 'Mathias Lorenz' },
  { id: 43, name: 'Brian Hjorth' },
  { id: 44, name: 'Michael Christensen' },
  { id: 45, name: 'Tobias Tvarnø' }
];
