import { ErgastConstructor } from './constructor.model';

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

export interface ErgastDriverResult {
  Driver: ErgastDriver;
  Constructor: ErgastConstructor,
  points: number;
  position: number;
  grid: number;
  status: string;
}
