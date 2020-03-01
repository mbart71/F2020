import { ErgastConstructor, ErgastDriver } from './ergast';

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
  driver: IDriver;
  points: number
  position: number;
  grid: number;
  status: string;
}
