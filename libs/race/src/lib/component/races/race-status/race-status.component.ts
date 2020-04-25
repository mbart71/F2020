import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'f2020-race-status',
  template: './race-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceStatusComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
