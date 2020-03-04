import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StandingService } from '../../service/standing.service';
import { ActivatedRoute, Params } from '@angular/router';
import { SeasonFacade } from '../../../season/+state/season.facade';
import { map, pluck, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { IDriverResult } from '@f2020/data';

@Component({
  selector: 'f2020-standing-driver',
  templateUrl: './standing-driver.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingDriverComponent implements OnInit {

  driverResult$: Observable<IDriverResult>;

  constructor(
    private route: ActivatedRoute,
    private service: StandingService,
    private seasonFacade: SeasonFacade) {
  }

  ngOnInit(): void {
    this.seasonFacade.season$.subscribe(_ => console.log('s', _));
    this.driverResult$ = combineLatest([
      this.route.params.pipe(pluck<Params, string>('driverId')),
      this.seasonFacade.season$.pipe(map(season => season.id))
    ]).pipe(
      switchMap(([driverId, seasonId]) => this.service.getDriverResult(seasonId, driverId)),
    );
  }

}
