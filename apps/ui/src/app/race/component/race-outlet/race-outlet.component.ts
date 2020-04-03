import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RacesActions } from './../../+state/races.actions';
import { RacesFacade } from './../../+state/races.facade';

@UntilDestroy()
@Component({
  selector: 'f2020-race-outlet',
  template: '<router-outlet></router-outlet>'
})
export class RaceOutletComponent implements OnInit {

  constructor(private facade: RacesFacade, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      untilDestroyed(this),
    ).subscribe(({country}) => this.facade.dispatch(RacesActions.selectRace({ country })));
  }

}
