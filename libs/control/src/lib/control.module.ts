import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDriverComponent } from './select-driver/select-driver.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DriverModule } from '@f2020/driver';
import { QualifyComponent } from './qualify/qualify.component';
import { FlexModule } from '@angular/flex-layout';
import { MatOptionModule } from '@angular/material/core';

const exported = [
  SelectDriverComponent,
  QualifyComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    DriverModule,
    FlexModule,
  ],
  declarations: [exported],
  exports: [exported],
})
export class ControlModule {
}
