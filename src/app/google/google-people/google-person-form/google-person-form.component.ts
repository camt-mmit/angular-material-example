import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'src/app/notifier.service';
import {
  FormCancelActions,
  FormProcessActions,
} from 'src/app/share/simple-form/simple-form.component';
import { GooglePersonControlComponent } from '..';
import { Person } from '../../models';

@Component({
  selector: 'app-google-person-form',
  templateUrl: './google-person-form.component.html',
  styleUrls: ['./google-person-form.component.scss'],
})
export class GooglePersonFormComponent implements OnInit {
  @Input() value: Person | null = null;

  @Output() valueChange = new EventEmitter<FormProcessActions<Person>>();
  @Output() cancel = new EventEmitter<FormCancelActions>();

  @ViewChild(GooglePersonControlComponent)
  controlComponent!: GooglePersonControlComponent;

  formGroup!: FormGroup;

  readonly errorFn = (): string | null => {
    this.controlComponent.markAsTouched();

    return null;
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      person: [this.value || null, [Validators.required]],
    });
  }

  onSubmit(
    process: FormProcessActions<{
      person: Person;
    }>,
  ): void {
    this.valueChange.emit({
      ...process,
      data: process.data.person,
    });
  }

  onCancel(cancel: FormCancelActions): void {
    this.cancel.emit(cancel);
  }
}
