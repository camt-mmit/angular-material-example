import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { GoogleEventsService } from 'src/app/google/google-events.service';
import { EventsList } from 'src/app/google/models';
import { switchMapDefault } from 'src/app/google/utils';

@Component({
  selector: 'app-google-events-list-page',
  templateUrl: './google-events-list-page.component.html',
  styleUrls: ['./google-events-list-page.component.scss'],
})
export class GoogleEventsListPageComponent implements OnInit {
  data$!: Observable<EventsList | null>;

  private loadSubject = new BehaviorSubject<void>(void 0);

  constructor(private readonly service: GoogleEventsService) {}

  ngOnInit(): void {
    const now = new Date();

    this.data$ = this.loadSubject.asObservable().pipe(
      switchMapDefault(null, () => {
        return this.service.getAll({
          singleEvents: true,
          orderBy: 'startTime',
          timeMin: now.toISOString(),
        });
      }),
    );
  }

  onReload(): void {
    this.loadSubject.next();
  }
}
