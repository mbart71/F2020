import { FirebaseModule } from './../firebase/firebase.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RacesEffects } from './+state/races.effects';
import { RacesFacade } from './+state/races.facade';
import * as fromRaces from './+state/races.reducer';
import { Bid } from '@f2020/data';

@NgModule({
  imports: [
    CommonModule,
    FirebaseModule,
    StoreModule.forFeature(fromRaces.RACES_FEATURE_KEY, fromRaces.reducer),
    EffectsModule.forFeature([RacesEffects]),
  ],
  providers: [RacesFacade],
})
export class RaceApiModule {
  static forRoot(initialBid: Bid) {
    
  }
}
