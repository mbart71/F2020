export interface ErgastConstructor {
  readonly constructorId: string;
  readonly url: string;
  readonly name: string;
  readonly nationality: string;
}

export interface ErgastConstructorStanding {
  position: string;
  points: string;
  Constructor: ErgastConstructor;
}
