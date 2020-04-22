import { SharedModule } from './../shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccountService } from './service/account.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TransactionsActionsComponent } from './component/transactions-actions/transactions-actions.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { AccountsComponent } from './component/accounts/accounts.component';



@NgModule({
  declarations: [TransactionsComponent, TransactionsActionsComponent, AccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionsComponent
      },
      {
        path: 'accounts',
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
    SharedModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountsModule { }
