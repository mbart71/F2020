import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStanding from './+state/standing.reducer';
import { StandingEffects } from './+state/standing.effects';
import { StandingFacade } from './+state/standing.facade';
import { StandingListComponent } from './component/standing-list/standing-list.component';
import { StandingDriverComponent } from './component/standing-driver/standing-driver.component';
import { StandingRoutingModule } from './standing-routing.module';

@NgModule({
  declarations: [StandingListComponent, StandingDriverComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStanding.STANDING_FEATURE_KEY,
      fromStanding.reducer
    ),
    EffectsModule.forFeature([StandingEffects]),
    StandingRoutingModule,
  ],
  providers: [StandingFacade]
})
export class StandingModule {}
