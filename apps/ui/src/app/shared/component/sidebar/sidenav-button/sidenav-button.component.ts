import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'f2020-sidenav-button',
  template: `
    <button mat-list-item>
          <span fxLayout fxLayoutAlign="start center" >
            <mat-icon [fontSet]="iconSet" [fontIcon]="icon"></mat-icon> <ng-content></ng-content>
          </span>
    </button>`,
  styleUrls: ['./sidenav-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavButtonComponent {

  @Input() iconSet = 'fa';
  @Input() icon: string;
  @Input() title: string;

}
