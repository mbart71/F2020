import { ErgastLocation } from './location.model';

export interface ErgastCircuit {
  readonly circuitId: string,
  readonly url: string;
  readonly circuitName: string;
  readonly Location: ErgastLocation
}

export interface ErgastRace {
  readonly season: string,
  readonly round: string,
  readonly url: string,
  readonly raceName: string,
  readonly Circuit: ErgastCircuit,
  readonly date: string,
  readonly time: string
}
