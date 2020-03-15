import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RacesComponent } from './component/races/races.component';
import { RaceRoutingModule } from './race-routing.module';
import { MaterialModule } from '../material.module';
import * as fromRaces from './+state/races.reducer';
import { RacesEffects } from './+state/races.effects';
import { RacesFacade } from './+state/races.facade';
import { SharedModule } from '../shared/shared.module';
import { RaceComponent } from './component/race/race.component';
import { RaceStatusComponent } from './component/races/race-status/race-status.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRaces.RACES_FEATURE_KEY, fromRaces.reducer),
    EffectsModule.forFeature([RacesEffects]),
    MaterialModule,
    RaceRoutingModule,
    SharedModule,
    GoogleMapsModule,
  ],
  providers: [RacesFacade],
  declarations: [RacesComponent, RaceComponent, RaceStatusComponent],
})
export class RaceModule {
}
