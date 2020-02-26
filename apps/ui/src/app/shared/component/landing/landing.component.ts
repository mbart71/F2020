import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player, PlayerFacade } from '../../../player';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'f2020-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  player$: Observable<Player>;

  constructor(private facade: PlayerFacade) { }

  ngOnInit(): void {
    this.player$ = this.facade.player$.pipe(tap(console.log));
  }

}
