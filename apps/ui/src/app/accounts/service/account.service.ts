import { GoogleFunctions } from './../../firebase/firebase.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { AccountsModule } from './../accounts.module';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AccountService {

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
}
