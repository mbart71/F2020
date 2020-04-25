import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from "@angular/router";
import { PlayersModule } from '@f2020/players';
import { SharedModule } from '@f2020/shared';
import { AccountsComponent } from './component/accounts/accounts.component';
import { TransactionsActionsComponent } from './component/transactions-actions/transactions-actions.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { AccountService } from './service';

@NgModule({
  declarations: [TransactionsComponent, TransactionsActionsComponent, AccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':uid',
        component: TransactionsComponent
      },
      {
        path: '',
        component: AccountsComponent
      }
    ]),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    FlexLayoutModule,
    ScrollingModule,
    SharedModule,
    PlayersModule,
  ],
  providers: [
    AccountService
  ]
})
export class BankModule {}
