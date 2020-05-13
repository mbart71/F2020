import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRace } from '@f2020/data';
import { RacesFacade } from '@f2020/api';

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
    this.races$ = this.facade.allRaces$.pipe(
      filter(races => !!races.length)
    );
  }
}
