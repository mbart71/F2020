import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RacesActions, RacesFacade } from '../../+state';
import { Bid, IRace } from '@f2020/data';
import { filter, map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'f2020-display-bid',
  templateUrl: './display-bid.component.html',
  styleUrls: ['./display-bid.component.scss']
})
export class DisplayBidComponent implements OnInit {

  bidControl = new FormControl({value: null , disabled: true});
  bid$: Observable<Partial<Bid>>
  race$: Observable<IRace>

  constructor(
    private facade: RacesFacade, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      untilDestroyed(this),
    ).subscribe(({country, uid}) => {
      this.facade.dispatch(RacesActions.selectRace({ country }))
      this.facade.dispatch(RacesActions.loadBid({ uid }))
    });
    this.race$ = this.facade.selectedRace$;
    this.bid$ = combineLatest([
      this.facade.bid$,
      this.route.params,
    ]).pipe(
      filter(([bid, {uid}]) =>bid && bid.player.uid === uid),
      map(([bid]) => bid),
      untilDestroyed(this),
    );
    this.bid$.subscribe(bid => this.bidControl.patchValue(bid));
  }
}
