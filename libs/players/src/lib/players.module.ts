import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromPlayers from "./+state/players.reducer";
import { PlayersEffects } from "./+state/players.effects";
import { PlayersFacade } from "./+state/players.facade";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromPlayers.PLAYERS_FEATURE_KEY,
      fromPlayers.reducer
    ),
    EffectsModule.forFeature([PlayersEffects])
  ],
  providers: [PlayersFacade, PlayersEffects]
})
export class PlayersModule {}
