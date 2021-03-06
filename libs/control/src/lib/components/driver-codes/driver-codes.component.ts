import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'f2020-driver-codes',
  template: `
     <ng-container *ngFor="let driverId of driverIds; last as last">{{(driverId | driver)?.code}}<ng-container *ngIf="!last">, </ng-container></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverCodesComponent {

  private _driverIds: string[];

  @Input() set driverIds(value: string[]) {
    this._driverIds = (value || []).filter(id => !!id)
  }

  get driverIds() {
    return this._driverIds;
  }

}
