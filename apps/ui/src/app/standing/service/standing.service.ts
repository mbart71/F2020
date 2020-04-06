import { Injectable } from '@angular/core';
import { ErgastService } from '../../shared/service/ergast.service';
import { Observable } from 'rxjs';
import { ErgastDriverQualifying, ErgastDriverResult, IDriverQualifying, IDriverResult, IDriverStanding, mapper } from '@f2020/data';
import { map } from 'rxjs/operators';

const finished: RegExp = /(\+[0-9] Lap)|(Finished)/;

@Injectable()
export class StandingService {

  constructor(private service: ErgastService) {
  }

  getStandings(seasonId: string | number): Observable<IDriverStanding[]> {
    return this.service.get(`${seasonId}/driverStandings.json`, ergastData => mapper.driverStandings(ergastData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? []));
  }

  getDriverResult(seasonId: string | number, driverId: string): Observable<IDriverResult> {
    return this.service.get<ErgastDriverResult[]>(`${seasonId}/drivers/${driverId}/results.json`, result => result.MRData.RaceTable.Races).pipe(
      map(raceResults => {
        const results = raceResults.map(mapper.driverResult);
        return <IDriverResult>{
          results,
          retired: results.reduce((acc, result) => acc += (finished.test(result.status) ? 0 : 1), 0),
          averageFinishPosition: results.reduce((acc, result) => acc + result.position, 0) / results.length,
          averageGridPosition: results.reduce((acc, result) => acc + result.grid, 0) / results.length,
        };
      }),
    );
  }

  getDriverQualify(seasonId: string | number, driverId: string): Observable<IDriverQualifying[]> {
    return this.service.get<ErgastDriverQualifying[]>(`${seasonId}/drivers/${driverId}/qualifying.json`, result => result.MRData.RaceTable.Races).pipe(
      map(qualifings => qualifings.map(mapper.driverQualifying)),
    );
  }

}
