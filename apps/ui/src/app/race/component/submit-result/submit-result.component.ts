import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRace } from '@f2020/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, pairwise, share, tap } from 'rxjs/operators';
import { RacesActions, RacesFacade } from '../../+state';

@UntilDestroy()
@Component({
  selector: 'f2020-submit-result',
  templateUrl: './submit-result.component.html',
  styleUrls: ['./submit-result.component.scss']
})
export class SubmitResultComponent implements OnInit {

  resultControl: FormControl = new FormControl();
  race$: Observable<IRace>;
  updating$: Observable<boolean>;

  constructor(
    private facade: RacesFacade,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.facade.dispatch(RacesActions.loadResult());
    this.race$ = this.facade.selectedRace$.pipe(
      filter(race => !!race),
      share(),
    );
    this.updating$ = this.facade.updating$;
    this.facade.result$.pipe(
      untilDestroyed(this),
    ).subscribe(result => this.resultControl.patchValue(result || {}, {emitEvent: false}));
    this.updating$.pipe(
      pairwise(),
      filter(([previous, current]) => previous && current === false) ,
      untilDestroyed(this),
    ).subscribe(() => this.router.navigate(['/']));
  }

  submitResult() {
    this.facade.dispatch(RacesActions.submitResult());
  }
}
