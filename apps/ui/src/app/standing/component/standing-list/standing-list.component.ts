import { Component, OnInit } from '@angular/core';
import { StandingFacade } from '../../+state/standing.facade';
import { IDriverStanding } from '@f2020/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'f2020-standing-list',
  templateUrl: './standing-list.component.html',
  styleUrls: ['./standing-list.component.css']
})
export class StandingListComponent implements OnInit {

  standings$: Observable<IDriverStanding[]>;

  constructor(private facade: StandingFacade) { }

  ngOnInit(): void {
    this.standings$ = this.facade.standings$;
  }

}
