import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { GoogleTokenService } from './google-token.service';
import {
  accessTokenNotFoundFactory,
  EventResource,
  EventsList,
  extractErrorFn,
  parseEventResource,
  parseEventsList,
} from './models';

const eventsUrl =
  'https://www.googleapis.com/calendar/v3/calendars/primary/events';

@Injectable({
  providedIn: 'root',
})
export class GoogleEventsService {
  constructor(
    private readonly tokenService: GoogleTokenService,
    private readonly http: HttpClient,
  ) {}

  getAll(params?: { [key: string]: any }): Observable<EventsList> {
    const queryParams = { ...params };

    return this.tokenService.getAuthorizationHeader().pipe(
      switchMap((authorizationHeader) => {
        if (authorizationHeader) {
          return this.http.get(eventsUrl, {
            headers: {
              Authorization: authorizationHeader,
            },
            params: queryParams,
          });
        }

        return throwError(accessTokenNotFoundFactory);
      }),
      catchError(extractErrorFn),
      map((data) => parseEventsList(data)),
    );
  }

  create(data: EventResource): Observable<EventResource> {
    return this.tokenService.getAuthorizationHeader().pipe(
      switchMap((authorizationHeader) => {
        if (authorizationHeader) {
          return this.http.post(eventsUrl, data, {
            headers: {
              Authorization: authorizationHeader,
            },
          });
        }

        return throwError(accessTokenNotFoundFactory);
      }),
      catchError(extractErrorFn),
      map((data) => parseEventResource(data)),
    );
  }
}
