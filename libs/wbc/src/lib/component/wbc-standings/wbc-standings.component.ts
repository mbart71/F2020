import { Component, OnInit } from '@angular/core';
import { SeasonFacade } from '@f2020/api';
import { WBCPlayer } from '@f2020/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const sum = (acc: Map<string, WBCPlayer>, wbcPlayer: WBCPlayer): Map<string, WBCPlayer> => {
  const uid = wbcPlayer.player.uid;
  const updated = acc.get(uid) || {...wbcPlayer, points: 0};
  updated.points += wbcPlayer.points; 
  return acc.set(uid, updated);
}

@Component({
  selector: 'f2020-wbc-standings',
  templateUrl: './wbc-standings.component.html',
  styleUrls: ['./wbc-standings.component.scss']
})
export class WbcStandingsComponent implements OnInit {

  standings$: Observable<WBCPlayer[]>;

  constructor(private facade: SeasonFacade) { }

  ngOnInit(): void {
    this.standings$ = this.facade.season$.pipe(
      map(season => season?.wbc || []),
      map(wbc => Array.from<WBCPlayer>(wbc.map(r => r.players).flat().reduce(sum, new Map<string, WBCPlayer>()).values())),
      map(players => players.sort((a, b) => b.points - a.points))
    );
  }

}
