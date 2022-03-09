import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { GoogleTokenService } from './google-token.service';
import {
  accessTokenNotFoundFactory,
  ConnectionsList,
  ConnectionsListParams,
  CreateContactParams,
  extractErrorFn,
  integer,
  parseConnectionsList,
  parsePerson,
  Person,
} from './models';

const peopleUrl = 'https://people.googleapis.com/v1';
const connectionsUrl = `${peopleUrl}/people/me/connections`;
const createContactUrl = `${peopleUrl}/people:createContact`;

@Injectable({
  providedIn: 'root',
})
export class GooglePeopleService {
  constructor(
    private readonly tokenService: GoogleTokenService,
    private readonly http: HttpClient,
  ) {}

  getConnectionsList(
    params: ConnectionsListParams,
  ): Observable<ConnectionsList> {
    const queryParams = { ...params };

    return this.tokenService.getAuthorizationHeader().pipe(
      switchMap((authorizationHeader) => {
        if (authorizationHeader) {
          return this.http.get(connectionsUrl, {
            headers: {
              Authorization: authorizationHeader,
            },
            params: queryParams,
          });
        }

        return throwError(accessTokenNotFoundFactory);
      }),
      catchError(extractErrorFn),
      map((data) => parseConnectionsList(data)),
    );
  }

  createContact(
    person: Person,
    params: CreateContactParams,
  ): Observable<Person> {
    return this.tokenService.getAuthorizationHeader().pipe(
      switchMap((authorizationHeader) => {
        if (authorizationHeader) {
          return this.http.post(createContactUrl, person, {
            headers: {
              Authorization: authorizationHeader,
            },
            params: params,
          });
        }

        return throwError(accessTokenNotFoundFactory);
      }),
      catchError(extractErrorFn),
      map((data) => parsePerson(data)),
    );
  }
}
