import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '@f2020/data';
import { Observable } from 'rxjs';
import { GoogleFunctions } from './../../firebase/firebase.module';
import * as firebase from "firebase/app";

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

  getTransactions(uid: string, start: firebase.firestore.Timestamp, numberOfTransactions: number): Observable<Transaction[]> {
    return this.afs.collection<Transaction>(AccountService.transactionsURL, ref => ref
      .where('involved', 'array-contains-any', [uid])
      .orderBy('date', 'desc')
      .startAt(start)
      .limit(10)
      // .limit(numberOfTransactions)
      // .endAt(start + numberOfTransactions)
    ).valueChanges();
  }
}
