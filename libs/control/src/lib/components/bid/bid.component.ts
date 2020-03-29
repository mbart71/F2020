import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Bid, IRace } from '@f2020/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbstractControlComponent } from '../../abstract-control-component';

@UntilDestroy()
@Component({
  selector: 'f2020-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BidComponent),
      multi: true, 
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BidComponent),
      multi: true, 
    },
  ]
})
export class BidComponent extends AbstractControlComponent implements OnInit {

  @Input() race: IRace;
  fg: FormGroup;

  fastestLapLabelFn = () => 'Hurtigste kører';
  firstCrashLabelFn = () => 'Første udgået';
  podiumLabelFn = (index: number) => `${index}. plads`;

  constructor(
    private fb: FormBuilder) {
      super();
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      qualify: [null, Validators.required],
      fastestDriver: [null, Validators.required],
      podium: [null, Validators.required],
      selectedDriver: [null],
      firstCrash: [null, Validators.required],
      polePositionTime: [null, Validators.required],
    });
    this.fg.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this),
    ).subscribe(value => this.propagateChange(value));
  }

  writeValue(value: Bid): void {
    if (value) {
      this.fg.patchValue({
        qualify: null,
        fastestDriver: null,
        podium: null,
        selectedDriver: null,
        firstCrash: null,
        polePositionTime: null,
        ...value
      });
    } else {
      this.fg.reset();
    }
  }

  markAllTouched(): void {
    this.markAllTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.fg.valid ? null : { required: true };
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.fg.disable() : this.fg.enable();
  }

}
