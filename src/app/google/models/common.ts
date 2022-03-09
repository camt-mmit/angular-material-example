import { Observable, throwError } from 'rxjs';

export type etag = string;
export type date = string;
export type datetime = string;
export type integer = number;

export function extractErrorFn(err: any): Observable<never> {
  if (err.error?.error) {
    return throwError(() => err.error.error);
  }

  return throwError(() => err);
}
