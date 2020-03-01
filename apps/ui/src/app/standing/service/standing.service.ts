import { Injectable } from '@angular/core';
import { ErgastService } from '../../shared/service/ergast.service';
import { Observable } from 'rxjs';
import { IDriverStanding, mapper } from '@f2020/data';

@Injectable()
export class StandingService {

  constructor(private service: ErgastService) { }

  getStandings(seasonId: string | number): Observable<IDriverStanding[]> {
    return this.service.get(`${seasonId}/driverStandings.json`, ergastData => mapper.driverStandings(ergastData.MRData.StandingsTable.StandingsLists[0].DriverStandings))
  }


}
