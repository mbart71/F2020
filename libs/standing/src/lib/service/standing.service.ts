import { ErgastService } from '@f2020/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finished, ErgastDriverResult, IDriverQualifying, IDriverResult, IDriverStanding, mapper, ErgastDriversQualifying } from '@f2020/data';
import { map } from 'rxjs/operators';

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
          retired: results.reduce((acc, result) => acc += (finished(result.status) ? 0 : 1), 0),
          averageFinishPosition: results.reduce((acc, result) => acc + result.position, 0) / results.length,
          averageGridPosition: results.reduce((acc, result) => acc + result.grid, 0) / results.length,
        };
      }),
    );
  }

  getDriverQualify(seasonId: string | number, driverId: string): Observable<IDriverQualifying[]> {
    return this.service.get<ErgastDriversQualifying[]>(`${seasonId}/drivers/${driverId}/qualifying.json`, result => result.MRData.RaceTable.Races).pipe(
      map(qualifings => qualifings.map(q => mapper.driverQualifying(q.QualifyingResults[0]))),
    );
  }
}
