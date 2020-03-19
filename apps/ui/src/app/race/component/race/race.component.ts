import { Component, OnInit } from '@angular/core';
import { RacesFacade } from '../../+state/races.facade';
import { RacesActions } from '../../+state/races.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IRace } from '@f2020/data';

@UntilDestroy()
@Component({
  selector: 'f2020-race',
  styleUrls: ['./race.component.scss'],
  templateUrl: './race.component.html',
})
export class RaceComponent implements OnInit {

  center$: Observable<google.maps.LatLng>;
  race$: Observable<IRace>;


  options: google.maps.MapOptions = {
    draggable: true,
    zoomControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    streetViewControl: true,
    mapTypeControl: false,
    zoom: 15,
    mapTypeId: 'roadmap',
  };

  constructor(private facade: RacesFacade, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      pluck<Params, string>('country'),
      untilDestroyed(this),
    ).subscribe(country => this.facade.dispatch(RacesActions.selectRace({ country })));
    this.race$ = this.facade.selectedRace$.pipe(filter(race => !!race));
    this.center$ = this.race$.pipe(
      map(race => new google.maps.LatLng(race.location.lat, race.location.lng)),
    );
  }

}
