import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStanding from './+state/standing.reducer';
import { StandingEffects } from './+state/standing.effects';
import { StandingFacade } from './+state/standing.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStanding.STANDING_FEATURE_KEY,
      fromStanding.reducer
    ),
    EffectsModule.forFeature([StandingEffects])
  ],
  providers: [StandingFacade]
})
export class StandingModule {}
