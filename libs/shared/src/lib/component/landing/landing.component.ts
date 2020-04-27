import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '@f2020/data';
import { PlayerFacade } from '@f2020/player';

@Component({
  selector: 'sha-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  player$: Observable<Player>;

  constructor(private facade: PlayerFacade) {
  }

  ngOnInit(): void {
    this.player$ = this.facade.player$;
  }

}
