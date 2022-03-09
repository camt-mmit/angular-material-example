import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

import { ShareModule } from '../share/share.module';

import { GoogleUiModule } from './google-ui.module';

import { GoogleRoutingModule } from './google-routing.module';
import { GoogleEventsListPageComponent } from './pages/google-events/google-events-list-page/google-events-list-page.component';
import { GoogleComponent } from './pages/google/google.component';
import { GoogleAuthorizationPageComponent } from './pages/google-authorization-page/google-authorization-page.component';
import { GoogleEventCreatePageComponent } from './pages/google-events/google-event-create-page/google-event-create-page.component';
import { GoogleConnectionsListPageComponent } from './pages/google-people/google-connections-list-page/google-connections-list-page.component';
import { GoogleContactCreatePageComponent } from './pages/google-people/google-contact-create-page/google-contact-create-page.component';
import { GoogleTokenManagementPageComponent } from './pages/google-token/google-token-management-page/google-token-management-page.component';

@NgModule({
  declarations: [
    GoogleComponent,
    GoogleEventsListPageComponent,
    GoogleAuthorizationPageComponent,
    GoogleEventCreatePageComponent,
    GoogleConnectionsListPageComponent,
    GoogleContactCreatePageComponent,
    GoogleTokenManagementPageComponent,
  ],
  imports: [
    CommonModule,
    GoogleRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    ShareModule,
    GoogleUiModule,
  ],
})
export class GoogleModule {
  constructor() {}
}
