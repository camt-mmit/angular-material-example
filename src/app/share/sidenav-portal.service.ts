import { Portal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavPortalService {
  private readonly subject = new BehaviorSubject<Portal<unknown> | null>(null);

  readonly portal$ = this.subject.asObservable().pipe(debounceTime(100));

  constructor() {}

  setPortal(portal: Portal<unknown> | null): void {
    this.subject.next(portal);
  }
}
