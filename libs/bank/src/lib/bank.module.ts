import { MatSelectModule } from '@angular/material/select';
import { FirebaseModule } from '@f2020/api';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
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
import { PlayersApiModule } from '@f2020/api';
import { SharedModule } from '@f2020/shared';
import { AccountsListComponent } from './component/accounts-list/accounts-list.component';
import { AccountsComponent } from './component/accounts/accounts.component';
import { MyTransactionsComponent } from './component/my-transactions/my-transactions.component';
import { PlayerTransactionsComponent } from './component/player-transactions/player-transactions.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { AccountService } from './service';
import { WithdrawDialogComponent } from './component/withdraw-dialog/withdraw-dialog.component';
import { DepositDialogComponent } from './component/deposit-dialog/deposit-dialog.component';
import { TransferDialogComponent } from './component/transfer-dialog/transfer-dialog.component';
import { DepositInfoDialogComponent } from './component/my-transactions/deposit-info-dialog/deposit-info-dialog.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    AccountsComponent,
    MyTransactionsComponent,
    PlayerTransactionsComponent,
    AccountsListComponent,
    WithdrawDialogComponent,
    DepositDialogComponent,
    TransferDialogComponent,
    DepositInfoDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'me',
        component: MyTransactionsComponent
      },
      {
        path: '',
        component: AccountsComponent,
        children: [
          {
            path: '',
            component: AccountsListComponent
          },
          {
            path: ':uid',
            component: PlayerTransactionsComponent
          }
        ]
      }
    ]),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    FlexLayoutModule,
    ScrollingModule,
    SharedModule,
    PlayersApiModule,
    ReactiveFormsModule,
    FirebaseModule,
  ],
  providers: [
    AccountService
  ]
})
export class BankModule { }
