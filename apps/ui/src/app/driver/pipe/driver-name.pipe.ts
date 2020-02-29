import { Pipe, PipeTransform } from '@angular/core';
import { DriverFacade } from '../+state/driver.facade';
import { IDriver } from '@f2020/data';

@Pipe({
  name: 'driverName',
  pure: false
})
export class DriverNamePipe implements PipeTransform {

  private previousCode: string;
  private name: string;
  private drivers: IDriver[];
  constructor(facade: DriverFacade) {
    facade.allDriver$.subscribe(drivers => this.drivers = drivers);
  }

  transform(code: string, ...args: unknown[]): unknown {

    if (code && code !== this.previousCode && this.drivers?.length) {
      this.previousCode = code;
      this.name = this.drivers.find(d => d.code === code)?.name ?? code;
    }
    return this.name ?? code;
  }

}
