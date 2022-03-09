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
import { EventResource } from '../../models';
import { GoogleEventControlComponent } from '../google-event-control/google-event-control.component';

@Component({
  selector: 'app-google-event-form',
  templateUrl: './google-event-form.component.html',
  styleUrls: ['./google-event-form.component.scss'],
})
export class GoogleEventFormComponent implements OnInit {
  @Input() value: EventResource | null = null;

  @Output() valueChange = new EventEmitter<FormProcessActions<EventResource>>();
  @Output() cancel = new EventEmitter<FormCancelActions>();

  @ViewChild(GoogleEventControlComponent)
  controlComponent!: GoogleEventControlComponent;

  formGroup!: FormGroup;

  readonly errorFn = () => {
    this.controlComponent.markAsTouched();

    let message: string | null = null;
    const errors = this.formGroup.get('eventResource')?.errors;
    if (errors?.['timeRange']?.invalidTimeRange) {
      message = 'Start time cannot be greater than end time!!!';
    }

    return message;
  };

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      eventResource: [this.value, [Validators.required]],
    });
  }

  onValueChange(
    process: FormProcessActions<{ eventResource: EventResource }>,
  ): void {
    this.valueChange.emit({
      ...process,
      data: process.data.eventResource,
    });
  }

  onCancel(cancel: FormCancelActions): void {
    this.cancel.emit(cancel);
  }
}
