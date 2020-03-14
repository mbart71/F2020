import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestoreUtils, IRace } from '@f2020/data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RacesService {

  constructor(private afs: AngularFirestore) {

  }

  getRaces(seasonId: string): Observable<IRace[]> {
    return this.afs.collection<IRace>(`season/${seasonId}/races`).valueChanges().pipe(
      map(firestoreUtils.convertTimestamps),
    );
  }
}
