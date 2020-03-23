import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Component, OnInit, forwardRef } from '@angular/core';
import { AbstractControlComponent } from '../abstract-control-component';
import { debounceTime, map } from 'rxjs/operators';

const minutes = (millis: number) => Math.floor(millis / (1000 * 60));
const seconds = (millis: number) => Math.floor((millis % (1000 * 60)) / 1000);
const milliseconds = (millis: number) => millis % 1000;

@UntilDestroy()
@Component({
  selector: 'f2020-pole-position-time',
  templateUrl: './pole-position-time.component.html',
  styleUrls: ['./pole-position-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PolePositionTimeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PolePositionTimeComponent),
      multi: true,
    },
  ],
})
export class PolePositionTimeComponent extends AbstractControlComponent implements OnInit {
  
  fg: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
  }
  
  ngOnInit(): void {
    this.fg = this.fb.group({
      minutes: [null, [Validators.required, Validators.min(1), Validators.max(2)]],
      seconds: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      milliseconds: [null, [Validators.required, Validators.min(0), Validators.max(999)]],
    });
    this.fg.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(100),
      map(value => ((value.minutes * 60) + value.seconds ) * 1000 + value.milliseconds)
    ).subscribe(millis => this.propagateChange(millis));
  }
  
  markAllTouched(): void {
    this.fg.markAllAsTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.fg.disable() : this.fg.enable();
  }

  writeValue(value: number): void {
    if (value) {
      this.fg.patchValue({
        minutes: minutes(value),
        seconds: seconds(value),
        milliseconds: milliseconds(value)
      });
    } else {
      this.fg.reset()
    }
  }

  validate(): ValidationErrors | null {
    return this.fg.valid ? null : { required: true };
  }

}
