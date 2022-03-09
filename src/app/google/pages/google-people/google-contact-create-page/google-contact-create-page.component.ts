import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GooglePersonFormComponent } from 'src/app/google/google-people';
import { GooglePeopleService } from 'src/app/google/google-people.service';
import { Person } from 'src/app/google/models';
import {
  FormCancelActions,
  FormProcessActions,
} from 'src/app/share/simple-form/simple-form.component';

@Component({
  selector: 'app-google-contact-create-page',
  templateUrl: './google-contact-create-page.component.html',
  styleUrls: ['./google-contact-create-page.component.scss'],
})
export class GoogleContactCreatePageComponent implements OnInit {
  @ViewChild(GooglePersonFormComponent)
  formComponent!: GooglePersonFormComponent;

  constructor(private readonly service: GooglePeopleService) {}

  ngOnInit(): void {
    return;
  }

  onValueChange(process: FormProcessActions<Person>): void {
    this.service
      .createContact(process.data, {
        personFields: 'names,phoneNumbers,emailAddresses',
      })
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
        process.success('Contact successfully created.');
        history.back();
      });
  }

  onCancel(cancel: FormCancelActions) {
    cancel.complete();
    history.back();
  }
}
