import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDriverStanding } from '@f2020/data';

@Component({
  selector: 'f2020-standing-list-item',
  template: `
    <span fxLayout fxFlexFill fxLayoutAlign="space-between center">
      <span>{{standing.driver.name}}</span>
      <span>{{standing.points}} point</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingListItemComponent {
  @Input() standing: IDriverStanding;

}
