import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDriver } from '@f2020/data';
import { AngularFirestore } from '@angular/fire/firestore';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DriverService {

  readonly drivers$: Observable<IDriver[]>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.drivers$ = this.afs.collection<IDriver>('drivers').valueChanges().pipe(
      share()
    );
  }
}
