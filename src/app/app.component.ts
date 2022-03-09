import { BreakpointObserver } from '@angular/cdk/layout';
import { Portal } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  tap,
} from 'rxjs';
import { SidenavPortalService } from './share/sidenav-portal.service';

const smallWidth = 600;
const mediaQuerySmall = `(max-width: ${smallWidth}px)`;
const mediaQueryDark = `(prefers-color-scheme: dark)`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  isSmallScreen$!: Observable<boolean>;
  isDark$!: Observable<boolean>;
  portal$!: Observable<Portal<unknown> | null>;

  private isDarkSubject: BehaviorSubject<boolean>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly sidenavPortalService: SidenavPortalService,
  ) {
    this.isDarkSubject = new BehaviorSubject<boolean>(
      document.documentElement.dataset?.['theme'] === 'dark',
    );
  }

  ngOnInit(): void {
    this.isSmallScreen$ = this.breakpointObserver
      .observe(mediaQuerySmall)
      .pipe(map((result) => result.matches));

    this.isDark$ = merge(
      this.isDarkSubject.asObservable(),
      this.breakpointObserver
        .observe(mediaQueryDark)
        .pipe(map((result) => result.matches)),
    ).pipe(
      distinctUntilChanged(),
      tap((isDark) => {
        if (isDark) {
          document.documentElement.dataset['theme'] = 'dark';
        } else {
          delete document.documentElement.dataset?.['theme'];
        }
      }),
    );

    this.portal$ = this.sidenavPortalService.portal$;
  }

  tryClose(): void {
    if (this.sidenav.opened && this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  onDarkModeChange(changed: MatSlideToggleChange): void {
    this.isDarkSubject.next(changed.checked);
  }
}
