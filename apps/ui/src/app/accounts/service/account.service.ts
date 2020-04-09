import { DateTime } from 'luxon';
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { converter, Transaction } from '@f2020/data';
import { firestore } from "firebase";
import { Observable } from 'rxjs';
import { GoogleFunctions } from './../../firebase/firebase.module';

@Injectable()
export class AccountService {

  static readonly transactionsURL = 'transactions';

  constructor(private afs: AngularFirestore,
    @Inject(GoogleFunctions) private functions: firebase.functions.Functions) { }

  async deposit(amount: number, message: string): Promise<true> {
    return this.functions.httpsCallable('deposit')({
      amount, message
    }).then(() => true);
  }

  async withdraw(amount: number, message: string): Promise<true> {
    return this.functions.httpsCallable('withdraw')({
      amount, message
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
