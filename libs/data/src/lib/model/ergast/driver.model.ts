import { ErgastConstructor } from './constructor.model';
import { ErgastRace } from './race.model';

export interface ErgastDriver {
  readonly driverId: string;
  readonly permanentNumber: string;
  readonly code: string;
  readonly url: string;
  readonly givenName: string;
  readonly familyName: string;
  readonly dateOfBirth: string;
  readonly nationality: string;
}

export interface ErgastDriverStanding {
  wins: number;
  points: number;
  Driver: ErgastDriver;
  Constructor: ErgastConstructor;
}

export interface ErgastDriverResult extends ErgastRace {
  Results: [{
    Driver: ErgastDriver;
    Constructor: ErgastConstructor,
    points: string;
    position: string;
    grid: string;
    status: string;
  }]
}
