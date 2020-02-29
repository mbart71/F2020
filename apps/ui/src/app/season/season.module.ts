import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSeason from './+state/season.reducer';
import { SeasonEffects } from './+state/season.effects';
import { SeasonFacade } from './+state/season.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromSeason.SEASON_FEATURE_KEY, fromSeason.reducer),
    EffectsModule.forFeature([SeasonEffects])
  ],
  providers: [SeasonFacade]
})
export class SeasonModule {}
