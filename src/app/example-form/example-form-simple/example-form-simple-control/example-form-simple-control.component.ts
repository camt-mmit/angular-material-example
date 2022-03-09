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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-example-form-simple-control',
  templateUrl: './example-form-simple-control.component.html',
  styleUrls: ['./example-form-simple-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ExampleFormSimpleControlComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ExampleFormSimpleControlComponent,
      multi: true,
    },
  ],
})
export class ExampleFormSimpleControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  readonly startAt = new Date(
    Date.UTC(new Date().getFullYear() - 20, 0, 1, 0, 0, 0, 0),
  );

  formGroup!: FormGroup;

  onTouched = () => {};

  private subscription = new Subscription();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value);
    }
  }

  registerOnChange(onChange: any): void {
    this.subscription.add(this.formGroup.valueChanges.subscribe(onChange));
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.formGroup.invalid) {
      return null;
    }

    const errors: ValidationErrors = {};

    ['firstname', 'lastname', 'gender', 'birthdate'].forEach((key) => {
      const filedErrors = this.formGroup.get(key)?.errors;

      if (filedErrors) {
        errors[key] = filedErrors;
      }
    });

    return errors;
  }

  getErrors(key: string): ValidationErrors | null | undefined {
    return this.formGroup.get(key)?.errors;
  }

  markAsTouched(): void {
    this.formGroup.markAllAsTouched();
  }
}
