import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {

  readonly current$ = this.afs.collection<any>('season', ref => ref.where('current', '==', true)).valueChanges().pipe(
    map(seasons => {
      if (seasons.length === 0) {
        throwError('No current season available');
      } else if (seasons.length > 1) {
        throwError(`Should only return one season.  Returned ${seasons.length}`);
      }
      return seasons[0];
    }),
  );

  constructor(private afs: AngularFirestore) {
  }
}
