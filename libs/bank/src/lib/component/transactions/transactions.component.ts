import { DataSource } from '@angular/cdk/table';
import { Component, Input } from '@angular/core';
import { Player, Transaction } from '@f2020/data';
import { AccountService, TransactionsDataSource } from '../../service';

@Component({
  selector: 'f2020-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  dataSource: DataSource<Transaction | undefined>;
  private _player: Player;

  constructor(private service: AccountService) { }


  @Input() set player(value: Player) {
    if (value) {
      this._player = value;
      this.dataSource = new TransactionsDataSource(value.uid, this.service)
    }
  }

  get player(): Player {
    return this._player;
  }

  amount(transaction: Transaction): number {
    return transaction.to === this.player.uid ? transaction.amount : - transaction.amount;
  }
}
