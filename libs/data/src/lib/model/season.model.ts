import { DateTime } from 'luxon';

export interface ISeason {
  readonly id?: string;
  name: string;
  latestWBCJoinDate: DateTime;
}

export class Season implements ISeason {
  readonly id?: string;
  readonly name: string;
  readonly latestWBCJoinDate: DateTime;

  constructor({ id, name, latestWBCJoinDate }: ISeason) {
    this.id = id;
    this.name = name;
    this.latestWBCJoinDate = latestWBCJoinDate;
  }
}
