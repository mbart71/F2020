import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRace } from '@f2020/data';
import { RacesFacade } from '../../+state/races.facade';

@Component({
  selector: 'f2020-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
})
export class RacesComponent implements OnInit {

  races$: Observable<IRace[]>;

  constructor(private facade: RacesFacade) {
  }

  ngOnInit(): void {
    this.races$ = this.facade.allRaces$;
  }

}
