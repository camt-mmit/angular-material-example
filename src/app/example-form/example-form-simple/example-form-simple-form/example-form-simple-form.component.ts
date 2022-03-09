import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormCancelActions,
  FormProcessActions,
} from 'src/app/share/simple-form/simple-form.component';
import { ExampleFormSimpleControlComponent } from '..';
import { SimpleFormData } from '../../models';

@Component({
  selector: 'app-example-form-simple-form',
  templateUrl: './example-form-simple-form.component.html',
  styleUrls: ['./example-form-simple-form.component.scss'],
})
export class ExampleFormSimpleFormComponent implements OnInit {
  @Input() value: SimpleFormData | null = null;

  @Output() valueChange = new EventEmitter<
    FormProcessActions<SimpleFormData>
  >();
  @Output() cancel = new EventEmitter<FormCancelActions>();

  @ViewChild(ExampleFormSimpleControlComponent)
  private simpleControl!: ExampleFormSimpleControlComponent;

  formGroup!: FormGroup;

  readonly errorFn = () => {
    this.simpleControl.markAsTouched();

    let message: string | null = null;
    if (
      !this.formGroup.get('value')?.invalid &&
      this.formGroup.get('consent')?.invalid
    ) {
      message = 'Consent mark is required!!!';
    } else {
      message = 'Invalid Form Data!!!';
    }

    return message;
  };

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      value: [this.value || null, [Validators.required]],
      consent: [false, []],
    });
  }

  onValueChange(
    process: FormProcessActions<{
      value: SimpleFormData;
      consent: boolean;
    }>,
  ): void {
    this.valueChange.emit({
      ...process,
      data: process.data.value,
      complete: () => {
        const consentControl = this.formGroup.get('consent')!;
        consentControl.setValue(false);
        consentControl.markAsUntouched();

        process.complete();
      },
    });
  }

  onCancel(cancel: FormCancelActions) {
    this.cancel.emit(cancel);
  }
}
