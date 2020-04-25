import { DateTime } from 'luxon';
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { converter, Transaction } from '@f2020/data';
import { firestore } from "firebase";
import { Observable } from 'rxjs';
import { GoogleFunctions } from '@f2020/api';

@Injectable()
export class AccountService {

  static readonly transactionsURL = 'transactions';

  constructor(private afs: AngularFirestore,
    @Inject(GoogleFunctions) private functions: firebase.functions.Functions) { }

  async deposit(amount: number, message: string): Promise<true> {
    return this.functions.httpsCallable('deposit')({
      amount, message, uid:'tdaLwa33t9gZ2n3rTbmQMW7CgbT2'
    }).then(() => true);
  }

  async withdraw(amount: number, message: string): Promise<true> {
    return this.functions.httpsCallable('withdraw')({
      amount, message, uid:'tdaLwa33t9gZ2n3rTbmQMW7CgbT2'
    }).then(() => true);
  }

  getTransactions(uid: string, start: DateTime, numberOfTransactions: number): Observable<Transaction[]> {
    return this.afs.collection<Transaction>(AccountService.transactionsURL, ref => ref
      .where('involved', 'array-contains', uid)
      .where('date', '<', firestore.Timestamp.fromDate(start.toJSDate()))
      .orderBy('date', 'desc')
      .limit(numberOfTransactions)
      .withConverter(converter.transaction)
    ).valueChanges();
  }
}
