import { DateTime } from 'luxon';
import { CoordinateModel } from './coordinate.model';
import { IDriver } from './driver.model';

export type State = 'waiting' | 'opened' | 'closed' | 'completed';

export interface IRace {
  state: State;
  readonly name: string;
  readonly open: DateTime;
  readonly close: DateTime;
  readonly location: CoordinateModel;
  readonly url: string;
  drivers?: IDriver[];
  selectedDriver: IDriver;
}
