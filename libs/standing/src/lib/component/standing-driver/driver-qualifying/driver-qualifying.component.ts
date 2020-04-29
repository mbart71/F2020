import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDriverQualifying } from '@f2020/data';

@Component({
  selector: 'f2020-driver-qualifying',
  templateUrl: './driver-qualifying.component.html',
  styleUrls: ['./driver-qualifying.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverQualifyingComponent {
  @Input() driverQualifying: IDriverQualifying[];
}
