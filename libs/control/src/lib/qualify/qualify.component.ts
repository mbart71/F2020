import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IRace } from '@f2020/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AbstractControlComponent } from '../abstract-control-component';

@UntilDestroy()
@Component({
  selector: 'f2020-qualify',
  templateUrl: './qualify.component.html',
  styleUrls: ['./qualify.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QualifyComponent),
      multi: true,
    },
  ],
})
export class QualifyComponent extends AbstractControlComponent implements OnInit {

  @Input() race: IRace;
  fg: FormGroup;
  grid: FormArray;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.grid = this.fb.array(Array.from({ length: 5 }, () => [null, Validators.required])),
      this.fg = this.fb.group({
        grid: this.grid,
      });
    this.grid.valueChanges.pipe(
      untilDestroyed(this),
    ).subscribe(value => this.propagateChange(this.fg.valid ? value : null));
  }

  writeValue(value: string[]): void {
    if (value) {
      this.grid.patchValue(value);
    } else {
      this.fg.reset();
    }
  }

  markAllTouched(): void {
    this.fg.markAllAsTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.fg.disable() : this.fg.enable();
  }

}
