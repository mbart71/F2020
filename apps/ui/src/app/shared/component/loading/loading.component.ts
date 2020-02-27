import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f2020-loading',
  template: `
    <div>
      <img src="assets/loading/tire.svg" alt="loading">
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
}
