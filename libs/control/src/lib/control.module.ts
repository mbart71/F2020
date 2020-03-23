import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DriverModule } from '@f2020/driver';
import { SelectDriverComponent } from './select-driver/select-driver.component';
import { SelectDriversComponent } from './select-drivers/select-drivers.component';
import { SelectedDriverComponent } from './selected-driver/selected-driver.component';
import { PolePositionTimeComponent } from './pole-position-time/pole-position-time.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const exported = [
  SelectDriverComponent,
  SelectDriversComponent,
  SelectedDriverComponent,
  PolePositionTimeComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    DriverModule,
    FlexModule,
  ],
  declarations: [exported],
  exports: [exported],
})
export class ControlModule {
}
