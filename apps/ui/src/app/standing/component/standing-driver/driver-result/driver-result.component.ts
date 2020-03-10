import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IDriverResult } from '@f2020/data';

@Component({
  selector: 'f2020-driver-result',
  templateUrl: './driver-result.component.html',
  styleUrls: ['./driver-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverResultComponent {
  @Input() driverResult: IDriverResult;
}
