import { SeasonFacade, RacesFacade, RacesActions } from '@f2020/api';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bid, IRace } from '@f2020/data';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'f2020-race',
  styleUrls: ['./race.component.scss'],
  templateUrl: './race.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceComponent implements OnInit {

  center$: Observable<google.maps.LatLng>;
  race$: Observable<IRace>;
  bid$: Observable<Partial<Bid>>;
  bids$: Observable<Bid[]>;

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

  constructor(private facade: RacesFacade) {
  }

  ngOnInit(): void {
    this.facade.dispatch(RacesActions.loadYourBid());
    this.facade.dispatch(RacesActions.loadBids());

    this.race$ = this.facade.selectedRace$.pipe(filter(race => !!race));
    this.bid$ = this.facade.yourBid$;
    this.bids$ = this.facade.bids$;
    this.center$ = this.race$.pipe(
      map(race => new google.maps.LatLng(race.location.lat, race.location.lng)),
    );
  }

  flagURL(race: IRace) {
    return `https://www.countryflags.io/${race.countryCode.toLocaleLowerCase()}/flat/64.png`
  }
}
