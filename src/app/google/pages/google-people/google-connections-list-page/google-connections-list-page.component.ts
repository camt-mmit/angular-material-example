import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GooglePeopleService } from 'src/app/google/google-people.service';
import { ConnectionsList } from 'src/app/google/models';
import { switchMapDefault } from 'src/app/google/utils';

@Component({
  selector: 'app-google-connections-list-page',
  templateUrl: './google-connections-list-page.component.html',
  styleUrls: ['./google-connections-list-page.component.scss'],
})
export class GoogleConnectionsListPageComponent implements OnInit {
  data$!: Observable<ConnectionsList | null>;

  private loadSubject = new BehaviorSubject<void>(void 0);

  constructor(private readonly service: GooglePeopleService) {}

  ngOnInit(): void {
    this.data$ = this.loadSubject.asObservable().pipe(
      switchMapDefault(null, () => {
        return this.service.getConnectionsList({
          personFields: 'names,emailAddresses,phoneNumbers,photos',
          sortOrder: 'FIRST_NAME_ASCENDING',
          pageSize: 1000,
        });
      }),
    );
  }

  onReload(): void {
    this.loadSubject.next();
  }
}
