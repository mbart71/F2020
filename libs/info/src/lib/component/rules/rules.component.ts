import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'info-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RulesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
