import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ControlModule } from '@f2020/control';
import { DriverModule } from '@f2020/driver';
import { SharedModule } from '@f2020/shared';
import { BidsComponent } from './component/bids/bids.component';
import { DisplayBidComponent } from './component/display-bid/display-bid.component';
import { EnterBidComponent } from './component/enter-bid/enter-bid.component';
import { PartialBidWarningComponent } from './component/partial-bid-warning/partial-bid-warning.component';
import { RaceOutletComponent } from './component/race-outlet/race-outlet.component';
import { RaceComponent } from './component/race/race.component';
import { RaceStatusComponent } from './component/races/race-status/race-status.component';
import { RacesComponent } from './component/races/races.component';
import { SubmitResultComponent } from './component/submit-result/submit-result.component';
import { RaceRoutingModule } from './race-routing.module';
import { RaceApiModule } from '@f2020/api';

const materialModules = [
  MatToolbarModule,
  MatListModule,
  MatTooltipModule,
]

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RaceRoutingModule,
    SharedModule,
    GoogleMapsModule,
    ControlModule,
    DriverModule,
    materialModules,
    RaceApiModule,
  ],
  declarations: [
    RacesComponent,
    RaceComponent,
    RaceStatusComponent,
    BidsComponent,
    EnterBidComponent,
    SubmitResultComponent,
    DisplayBidComponent,
    PartialBidWarningComponent,
    RaceOutletComponent,
  ],
})
export class RaceModule {
}
