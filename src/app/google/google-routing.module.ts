import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleAuthorizationPageComponent } from './pages/google-authorization-page/google-authorization-page.component';
import { GoogleEventCreatePageComponent } from './pages/google-events/google-event-create-page/google-event-create-page.component';
import { GoogleEventsListPageComponent } from './pages/google-events/google-events-list-page/google-events-list-page.component';
import { GoogleConnectionsListPageComponent } from './pages/google-people/google-connections-list-page/google-connections-list-page.component';
import { GoogleContactCreatePageComponent } from './pages/google-people/google-contact-create-page/google-contact-create-page.component';
import { GoogleTokenManagementPageComponent } from './pages/google-token/google-token-management-page/google-token-management-page.component';
import { GoogleComponent } from './pages/google/google.component';

const routes: Routes = [
  { path: 'authorization', component: GoogleAuthorizationPageComponent },
  {
    path: '',
    component: GoogleComponent,
    children: [
      { path: '', redirectTo: 'events', pathMatch: 'full' },
      { path: 'events', component: GoogleEventsListPageComponent },
      { path: 'events/create', component: GoogleEventCreatePageComponent },
      { path: 'people', component: GoogleConnectionsListPageComponent },
      {
        path: 'people/create-contact',
        component: GoogleContactCreatePageComponent,
      },
      { path: 'token', component: GoogleTokenManagementPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleRoutingModule {}
