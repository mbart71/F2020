import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Player } from '@f2020/data';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './deposit-dialog.component.html',
  styleUrls: ['./deposit-dialog.component.scss']
})
export class DepositDialogComponent implements OnInit {

  fg: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DepositDialogComponent>,
    private service: AccountService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { player: Player }) { }

  onDeposit() {
    const { amount, message } = this.fg.value
    this.dialogRef.close(this.service.deposit(this.data.player.uid, amount, message || 'Via MobilePay').then(() => amount));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      message: []
    })
  }

}
