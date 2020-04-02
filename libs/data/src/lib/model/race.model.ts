import { DateTime } from 'luxon';
import { CoordinateModel } from './coordinate.model';
import { IDriverRaceResult } from './driver.model';

export type State = 'waiting' | 'open' | 'closed' | 'completed';

export interface IRaceBasis {
  readonly round: number;
  readonly season: number;
  readonly name: string;
  readonly raceStart: DateTime;
  readonly countryCode: string;
  readonly location: CoordinateModel;
  readonly url: string;
}

export interface IRace extends IRaceBasis {
  state: State;
  readonly open: DateTime;
  readonly close: DateTime;
  drivers?: string[];
  selectedDriver: string;
}

export interface IRaceResult extends IRaceBasis {
  results: IDriverRaceResult[];
}
