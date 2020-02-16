export interface IDriver {
  readonly name: string;
  readonly code: string;
  readonly nationality: string;
  readonly permanentNumber: number
  readonly url: string;
}

export class DriverModel implements IDriver {
  readonly name: string;
  readonly code: string;
  readonly nationality: string;
  readonly permanentNumber: number;
  readonly url: string;

  constructor({ name, code, nationality, permanentNumber, url }: IDriver) {
    this.name = name;
    this.code = code;
    this.nationality = nationality;
    this.permanentNumber = permanentNumber;
    this.url = url;
  }
}
