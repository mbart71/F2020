import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const random = (max: number): number => Math.floor(Math.random() * Math.floor(max));

const tyres: string[] = [
  'blue',
  'green',
  'red',
  'white',
  'yellow',
];

@Component({
  selector: 'f2020-loading',
  template: `
    <div>
      <img [src]="tyre" alt="loading">
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  readonly tyre: string;
  constructor() {
    this.tyre = `assets/loading/${tyres[random(5)]}.svg`;
  }
}
