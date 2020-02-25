import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FirebaseModule } from '../firebase';
import { PlayerActions } from './+state/player.actions';
import { PlayerEffects } from './+state/player.effects';
import { PlayerFacade } from './+state/player.facade';
import * as fromPlayer from './+state/player.reducer';

@NgModule({
  imports: [
    CommonModule,
    FirebaseModule,
    StoreModule.forFeature(fromPlayer.PLAYER_FEATURE_KEY, fromPlayer.reducer),
    EffectsModule.forFeature([PlayerEffects])
  ]
})
export class PlayerModule {
  constructor(private facade: PlayerFacade) {
    this.facade.dispatch(PlayerActions.loadPlayer());
  }
}
