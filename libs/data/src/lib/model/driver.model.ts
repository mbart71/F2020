import { ErgastConstructor, ErgastDriver } from './ergast';
import { IRace, IRaceBasis } from './race.model';

export interface IDriver {
  readonly name: string;
  readonly driverId: string;
  readonly nationality: string;
  readonly permanentNumber: number
  readonly url: string;
}

export class DriverModel implements IDriver {
  readonly name: string;
  readonly driverId: string;
  readonly nationality: string;
  readonly permanentNumber: number;
  readonly url: string;

  constructor({ name, driverId, nationality, permanentNumber, url }: IDriver) {
    this.name = name;
    this.driverId = driverId;
    this.nationality = nationality;
    this.permanentNumber = permanentNumber;
    this.url = url;
  }
}

export interface IDriverStanding {
  wins: number;
  points: number;
  driver: IDriver;
}

export interface IDriverResult {
  retired: number;
  averageGridPosition: number;
  averageFinishPosition: number;
  results: IDriverRaceResult[];
}

export interface IDriverRaceResult {
  race: IRaceBasis;
  driver: IDriver;
  points: number
  position: number;
  grid: number;
  status: string;
}
