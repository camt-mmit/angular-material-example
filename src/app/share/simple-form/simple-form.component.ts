import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { NotifierService } from 'src/app/notifier.service';
import { SimpleFormOptionsDirective } from './simple-form-options.directive';
import { SimpleFormActionDirective } from './simple-form-action.directive';

export type FormCancelActions = {
  name: string | null;
  success: (message: string | null) => void;
  error: (error: unknown) => void;
  complete: () => void;
};
export type FormProcessActions<T> = FormCancelActions & {
  data: T;
};

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleFormComponent<T> implements OnInit {
  get hideCancel(): boolean {
    return this.formOptions?.hideCancel || false;
  }

  @Output() valueChange = new EventEmitter<FormProcessActions<T>>();
  @Output() cancel = new EventEmitter<FormCancelActions>();
  @Input() errorFn: () => string | null = () => null;

  get formGroup(): FormGroup {
    return this.formGroupDirective.control;
  }

  private _processing = false;
  get processing(): boolean {
    return this._processing;
  }

  private formGroupDisabled = false;

  @ViewChild('defaultFormAction')
  private readonly defaultFormAction!: SimpleFormActionDirective;

  private _processingFormAction: SimpleFormActionDirective | null = null;
  get processingFormAction(): SimpleFormActionDirective {
    return this._processingFormAction ?? this.defaultFormAction;
  }

  private callbacks = ((oThis) => {
    return {
      success(message: string | null): void {
        if (message) {
          oThis.setMessage(message);
        }

        this.complete();
      },

      error(error: unknown): void {
        if (error instanceof Error) {
          oThis.setMessage(error.message, true);
        } else {
          oThis.setMessage(String.toString.apply(error), true);
        }

        this.complete();
      },

      complete(): void {
        oThis.finishProcessing();
      },
    };
  })(this);

  constructor(
    private readonly notifier: NotifierService,
    private readonly formGroupDirective: FormGroupDirective,
    @Optional() private readonly formOptions?: SimpleFormOptionsDirective,
  ) {}

  ngOnInit(): void {
    return;
  }

  private initProcessing(): void {
    if (this.processing) return;

    this._processing = true;
    this.formGroupDisabled = this.formGroup.disabled;
    if (!this.formGroupDisabled) {
      this.formGroup.disable();
    }
  }

  private finishProcessing(): void {
    this._processing = false;
    if (!this.formGroupDisabled) {
      this.formGroup.enable();
    }
    this._processingFormAction = null;
  }

  private setMessage(message: string, isError = false): void {
    this.notifier.notify(message, isError);
  }

  onSubmit(): void {
    if (this.processing) return;

    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      const message = this.errorFn();

      if (message) {
        this.setMessage(message, true);
      } else {
        this.setMessage('Invalid Form Data!!!', true);
      }
    } else {
      const value = this.formGroup.value;

      this.initProcessing();
      this.valueChange.emit({
        ...this.callbacks,
        name: this.processingFormAction.name,
        data: value,
      });
    }
  }

  onCancel(): void {
    if (this.processing) return;

    this.initProcessing();
    this.cancel.emit({
      ...this.callbacks,
      name: this.processingFormAction.name,
    });
  }

  setFormAction(formAction: SimpleFormActionDirective) {
    this._processingFormAction = formAction;
  }
}
