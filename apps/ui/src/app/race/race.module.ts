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

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRaces.RACES_FEATURE_KEY, fromRaces.reducer),
    EffectsModule.forFeature([RacesEffects]),
    MaterialModule,
    RaceRoutingModule,
  ],
  providers: [RacesFacade],
  declarations: [RacesComponent]
})
export class RaceModule {}
