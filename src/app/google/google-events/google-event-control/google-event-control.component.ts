import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { EventResource } from '../../models';
import { localTimeString } from '../../utils';

@Component({
  selector: 'app-google-event-control',
  templateUrl: './google-event-control.component.html',
  styleUrls: ['./google-event-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GoogleEventControlComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: GoogleEventControlComponent,
      multi: true,
    },
  ],
})
export class GoogleEventControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  formGroup!: FormGroup;

  onTouched = () => {};

  private valueChanges$!: Observable<EventResource>;
  private readonly subscriptions: Subscription[] = [];

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      summary: [null, [Validators.required]],
      timeRange: this.fb.group(
        {
          start: this.fb.group({
            dateTime: [null, [Validators.required]],
          }),
          end: this.fb.group({
            dateTime: [null, [Validators.required]],
          }),
        },
        {
          validators: [
            (timeRangeGroup: AbstractControl) => {
              const errors: { [key: string]: any } = {};

              const startTime = timeRangeGroup.get('start.dateTime')?.value;
              const endTime = timeRangeGroup.get('end.dateTime')?.value;

              if (!!startTime && !!endTime && startTime >= endTime) {
                errors['invalidTimeRange'] = true;
              }

              return Object.keys(errors).length > 0 ? errors : null;
            },
          ],
          updateOn: 'blur',
        },
      ),
    });

    this.valueChanges$ = this.formGroup.valueChanges.pipe(
      map((value) => {
        const { timeRange, ...newValue } = value;
        newValue.start = timeRange.start;
        newValue.end = timeRange.end;

        if (
          newValue.start?.dateTime &&
          !(newValue.start.dateTime instanceof Date)
        ) {
          newValue.start.dateTime = new Date(newValue.start.dateTime);
        }

        if (
          newValue.end?.dateTime &&
          !(newValue.end.dateTime instanceof Date)
        ) {
          newValue.end.dateTime = new Date(newValue.end.dateTime);
        }

        return newValue;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  writeValue(value: any): void {
    if (value) {
      const { start, end, ...newValue } = value;
      newValue.timeRange = {
        start: start,
        end: end,
      };

      if (start.dateTime instanceof Date) {
        start.dateTime = localTimeString(start.dateTime);
      }

      if (end.dateTime instanceof Date) {
        end.dateTime = localTimeString(end.dateTime);
      }
      this.formGroup.setValue(newValue, { emitEvent: false });
    }
  }

  registerOnChange(onChange: any): void {
    const sub = this.valueChanges$.subscribe(onChange);
    this.subscriptions.push(sub);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  validate(parentControl: AbstractControl): ValidationErrors | null {
    /**
     * NOTE: The return errors will be merged to parentControl.errors.
     */
    const errors: ValidationErrors = {};
    if (!this.formGroup.invalid) {
      return null;
    }

    [
      'summary',
      'timeRange',
      'timeRange.start.dateTime',
      'timeRange.end.dateTime',
    ].forEach((key) => {
      const controlErrors = this.formGroup.get(key)?.errors;
      if (controlErrors !== null) {
        const names = key.split('.');
        let container = errors;
        while (names.length > 1) {
          const innerKey = names.shift()!;
          container[innerKey] = { ...container[innerKey] };
          container = container[innerKey];
        }
        container[names[0]] = controlErrors;
      }
    });

    return errors;
  }

  /**
   * Just for now, it cannot directly make custom control be touched
   * by using formGroup.markAllAsTouched() of parentControl.
   * We have to create method and call it manually.
   *
   * @see https://github.com/angular/angular/issues/27315
   */
  markAsTouched(): void {
    this.formGroup.markAllAsTouched();
  }

  getErrors(key: string): ValidationErrors | null | undefined {
    return this.formGroup.get(key)?.errors;
  }
}
