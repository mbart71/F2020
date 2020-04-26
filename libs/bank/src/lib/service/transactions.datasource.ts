import { CollectionViewer, ListRange } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Transaction } from '@f2020/data';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AccountService } from './account.service';

export class TransactionsDataSource extends DataSource<Transaction | undefined> {
  private cached = Array.from<Transaction>({ length: 0 });
  private dataStream = new BehaviorSubject<(Transaction | undefined)[]>(this.cached);
  private subscription = new Subscription();

  private pageSize = 30;
  private lastPage = 0;
  private lastDate: DateTime = DateTime.local();

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
        this.fetchTransaction();
      }
    }));
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private fetchTransaction(): void {
    this.service.getTransactions(this.uid, this.lastDate, this.pageSize).pipe(
      first()
    ).subscribe(res => {
      this.cached = this.cached.concat(res);
      this.dataStream.next(this.cached);
      this.lastDate = res[res.length - 1]?.date;
    });
  }

  private getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

}
