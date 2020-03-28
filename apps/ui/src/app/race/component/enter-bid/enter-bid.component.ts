import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IRace } from '@f2020/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { debounceTime, filter, pluck, share, tap } from 'rxjs/operators';
import { RacesActions } from '../../+state/races.actions';
import { RacesFacade } from '../../+state/races.facade';

@UntilDestroy()
@Component({
  selector: 'f2020-enter-bid',
  templateUrl: './enter-bid.component.html',
  styleUrls: ['./enter-bid.component.scss']
})
export class EnterBidComponent implements OnInit {

  bidControl: FormControl = new FormControl();
  race$: Observable<IRace>;

  constructor(
    private facade: RacesFacade,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.facade.dispatch(RacesActions.loadYourBid());
    this.route.params.pipe(
      pluck<Params, string>('country'),
      untilDestroyed(this),
    ).subscribe(country => this.facade.dispatch(RacesActions.selectRace({ country })));


    this.race$ = this.facade.selectedRace$.pipe(
      filter(race => !!race),
      tap(_ => console.log(_)),
      share(),
    );
    this.facade.yourBid$.pipe(
      filter(bid => !bid.submitted),
      untilDestroyed(this),
    ).subscribe(bid => this.bidControl.patchValue(bid || {}, {emitEvent: false}));
    this.facade.yourBid$.pipe(
      filter(bid => bid.submitted),
      untilDestroyed(this),
    ).subscribe(() => this.bidControl.disable());
    this.bidControl.valueChanges.pipe(
      debounceTime(3000),
      untilDestroyed(this),
    ).subscribe(value => this.facade.dispatch(RacesActions.updateBid({bid: value})));
  }
}
