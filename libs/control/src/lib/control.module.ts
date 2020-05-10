import { PolePositionTimePipe } from './pipes/pole-position-time.pipe';
import { MatIconModule } from '@angular/material/icon';
import { DriverCodesComponent } from './components/driver-codes/driver-codes.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DriverModule } from '@f2020/driver';
import { SelectDriverComponent } from './components/select-driver/select-driver.component';
import { SelectDriversComponent } from './components/select-drivers/select-drivers.component';
import { SelectedDriverComponent } from './components/selected-driver/selected-driver.component';
import { PolePositionTimeComponent } from './components/pole-position-time/pole-position-time.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BidComponent } from './components/bid/bid.component';

const exported = [
  SelectDriverComponent,
  SelectDriversComponent,
  SelectedDriverComponent,
  PolePositionTimeComponent,
  BidComponent,
  DriverCodesComponent,
];

const components = [
  
];

const pipes = [
  PolePositionTimePipe
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    DriverModule,
    FlexModule,
  ],
  declarations: [exported, components, pipes],
  exports: [exported, pipes],
})
export class ControlModule {
}
