import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GoogleEventsService } from 'src/app/google/google-events.service';
import { GoogleEventFormComponent } from 'src/app/google/google-events';
import { EventResource } from 'src/app/google/models';
import {
  FormCancelActions,
  FormProcessActions,
} from 'src/app/share/simple-form/simple-form.component';

@Component({
  selector: 'app-google-event-create-page',
  templateUrl: './google-event-create-page.component.html',
  styleUrls: ['./google-event-create-page.component.scss'],
})
export class GoogleEventCreatePageComponent implements OnInit {
  @ViewChild(GoogleEventFormComponent) formComponent!: GoogleEventFormComponent;

  constructor(private readonly service: GoogleEventsService) {}

  ngOnInit(): void {
    return;
  }

  onValueChange(process: FormProcessActions<EventResource>): void {
    this.service
      .create(process.data)
      .pipe(
        catchError((err) => {
          let errorMessage = 'Server Error!!!';

          if (Array.isArray(err.errors)) {
            errorMessage = err.errors
              .map((error: any) => error.message)
              .join('\n');
          }

          process.error(new Error(errorMessage));

          return throwError(() => err);
        }),
      )
      .subscribe((data) => {
        process.success('Event successfully created.');
        history.back();
      });
  }

  onCancel(cancel: FormCancelActions) {
    cancel.complete();
    history.back();
  }
}
