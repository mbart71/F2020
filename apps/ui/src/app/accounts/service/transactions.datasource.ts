import { first } from 'rxjs/operators';
import { AccountService } from './account.service';
import { DataSource } from '@angular/cdk/table';
import { Transaction } from '@f2020/data';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { CollectionViewer, ListRange } from '@angular/cdk/collections';
import * as firebase from "firebase/app";

export class TransactionsDataSource extends DataSource<Transaction | undefined> {
  private cached = Array.from<Transaction>({ length: 0 });
  private dataStream = new BehaviorSubject<(Transaction | undefined)[]>(this.cached);
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;
  private lastDate: firebase.firestore.Timestamp = firebase.firestore.Timestamp.fromMillis(1576694244 * 1000);

  constructor(private readonly uid: string, private readonly service: AccountService) {
    super();
    this.fetchTransaction();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Transaction | undefined)[] | ReadonlyArray<Transaction | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe((range: ListRange) => {

      const currentPage = this.getPageForIndex(range.end);

      if (currentPage && range) {
        console.log(currentPage, this.lastPage);
      }

      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this.fetchTransaction(currentPage);
      }
    }));
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private fetchTransaction(currentPage: number = 0): void {
    this.service.getTransactions(this.uid, this.lastDate, this.pageSize).pipe(
      first()
    ).subscribe(res => {
      this.cached = this.cached.concat(res);
      this.dataStream.next(this.cached);
      this.lastDate = <any> res[res.length - 1].date;
    });
  }

  private getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

}
