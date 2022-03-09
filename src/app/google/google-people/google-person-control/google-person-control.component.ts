import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EmailAddress, Name, Person, PhoneNumber } from '../../models';

@Component({
  selector: 'app-google-person-control',
  templateUrl: './google-person-control.component.html',
  styleUrls: ['./google-person-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GooglePersonControlComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: GooglePersonControlComponent,
      multi: true,
    },
  ],
})
export class GooglePersonControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @Input() value: Person | null = null;

  private readonly creteName = (name: Name | null) =>
    this.fb.group({
      givenName: [name?.givenName || null, [Validators.required]],
      familyName: [name?.familyName || null],
    });

  private readonly createEmailAddress = (emailAddress: EmailAddress | null) =>
    this.fb.group({
      value: [emailAddress?.value || null, [Validators.required]],
    });

  private readonly createPhoneNumber = (phoneNumber: PhoneNumber | null) =>
    this.fb.group({
      value: [phoneNumber?.value || null, [Validators.required]],
    });

  formGroup!: FormGroup;

  onTouched = () => {};

  private valueChanges$!: Observable<Person>;
  private readonly subscriptions: Subscription[] = [];

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      names: this.fb.array((this.value?.names || [null]).map(this.creteName), {
        validators: [Validators.required],
      }),
      emailAddresses: this.fb.array(
        (this.value?.emailAddresses || []).map(this.createEmailAddress),
      ),
      phoneNumbers: this.fb.array(
        (this.value?.phoneNumbers || []).map(this.createPhoneNumber),
      ),
    });

    this.valueChanges$ = this.formGroup.valueChanges;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value);
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

  validate(control: AbstractControl): ValidationErrors | null {
    /**
     * NOTE: The return errors will be merged to parentControl.errors.
     */
    const errors: ValidationErrors = {};
    if (!this.formGroup.invalid) {
      return null;
    }

    [
      'names.givenName',
      'names.familyName',
      'phoneNumbers.value',
      'emailAddresses.value',
    ].forEach((pattern) => {
      const patterns = pattern.split('.', 2);
      const key = patterns[0];
      const field = patterns[1];

      const formArray =
        this[key as 'names' | 'phoneNumbers' | 'emailAddresses'];

      if (!errors[key]) {
        const formArrayError = formArray.errors;
        if (formArrayError) {
          errors[key] = formArrayError;
        }
      }

      formArray.controls.forEach((control, index) => {
        const controlErrors = control.errors;
        if (controlErrors) {
          errors[key] = {
            ...errors[key],
            [index]: {
              ...errors[key]?.[index],
              ...controlErrors,
            },
          };
        }

        const fieldErrors = control.get(field)?.errors;
        if (fieldErrors) {
          errors[key] = {
            ...errors[key],
            [index]: {
              ...errors[key]?.[index],
              [field]: {
                ...errors[key]?.[index]?.[field],
                ...fieldErrors,
              },
            },
          };
        }
      });
    });

    return errors;
  }

  get names(): FormArray {
    return this.formGroup.get('names') as FormArray;
  }

  get emailAddresses(): FormArray {
    return this.formGroup.get('emailAddresses') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.formGroup.get('phoneNumbers') as FormArray;
  }

  addEmailAddress(): void {
    this.emailAddresses.push(this.createEmailAddress(null));
  }

  removeEmailAddress(index: number): void {
    this.emailAddresses.removeAt(index);
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.createPhoneNumber(null));
  }

  removePhoneNumber(index: number): void {
    this.phoneNumbers.removeAt(index);
  }

  getErrors(key: string): ValidationErrors | null | undefined {
    return this.formGroup.get(key)?.errors;
  }

  markAsTouched(): void {
    this.formGroup.markAllAsTouched();
  }
}
