import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErgastService {

  constructor(private http: HttpClient) {
  }

  get<T>(url: string, mapFn: (ergastData: any) => T[]): Observable<T[]> {
    return this.http.get(`https://ergast.com/api/f1/${url}`).pipe(
      map(mapFn),
    );
  }
}
