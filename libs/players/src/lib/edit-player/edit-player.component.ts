import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      balance: [0, Validators.min(-100)]
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
      }, { emitEvent: false });
      this.fg.get('balance').patchValue(player.balance || 0, { emitEvent: false });
    })
  }

  updateRoles() {
    const value = Object.values(this.fg.get('roles').value);
    const roles: Role[] = (['player', 'admin', 'bank-admin'] as Role[]).filter((_, index) => value[index]);
    this.player$.pipe(
      first(),
      switchMap(player => this.playerService.updatePlayer(player.uid, { roles: roles.length ? roles : ['anonymous'] })),
    ).subscribe(() => this.snackBar.open('Roller opdateret', null, { duration: 2000 }));
  }

  updateBalance() {
    const balance = this.fg.get('balance').value || 0;
    this.player$.pipe(
      first(),
      switchMap(player => this.playerService.updateBalance(player.uid, balance)),
    ).subscribe(() => this.snackBar.open(`Saldo opdateret til ${balance}`, null, { duration: 2000 }));
  }

  migrateAccount() {
    const playerName = this.fg.get('migration').value;
    if (playerName) {
      this.player$.pipe(
        first(),
        switchMap(player => this.playerService.migrateAccount(player.uid, playerName)),
      ).subscribe(() => this.snackBar.open('Migrering afsluttet', null, { duration: 2000 }));
    }
  }

}

const accountAndNames = [
  { playerName: "flb", name: "Flemming Bregnvig" },
  { playerName: "bartrup", name: "Michael Bartrup" },
  { playerName: "ttp", name: "Thomas Trebbien Pedersen" },
  { playerName: "peter", name: "Peter Thorup" },
  { playerName: "nra", name: "Niels Henrik Rasmussen" },
  { playerName: "killerkim", name: "Thomas Knudsen" },
  { playerName: "palle", name: "Palle Bregnvig" },
  { playerName: "mmathiesen", name: "Morten Mathiesen" },
  { playerName: "tnl", name: "Thorbjørn Larsen" },
  { playerName: "dalsten", name: "Jesper Dalsten" },
  { playerName: "mhoejte", name: "Mogens Højte" },
  { playerName: "nino", name: "Nino Stokbro Ag" },
  { playerName: "fie", name: "Anne Sofie Bregnvig" },
  { playerName: "rusche", name: "Christian Rusche" },
  { playerName: "jacob", name: "Jacob Andersen" },
  { playerName: "STR", name: "Stefan Trabolt" },
  { playerName: "jette", name: "Jette Hansen" },
  { playerName: "Alboreto", name: "Claus Jessing" },
  { playerName: "katrine", name: "Katrine Jensen" },
  { playerName: "laier", name: "Morten Laier" },
  { playerName: "heidemeister", name: "Michael Heide" },
  { playerName: "henrik", name: "Henrik Aakjær" },
  { playerName: "kaare", name: "Kåre Pedersen" },
  { playerName: "steffen", name: "Steffen Larsen" },
  { playerName: "bruun", name: "Søren Bruun" },
  { playerName: "weile", name: "Michael Weile" },
  { playerName: "mathias", name: "Mathias Lorenz" },
  { playerName: "brian", name: "Brian Hjorth" },
  { playerName: "bakkekammen", name: "Michael Christensen" },
  { playerName: "tobias", name: "Tobias Tvarnø" },
];
