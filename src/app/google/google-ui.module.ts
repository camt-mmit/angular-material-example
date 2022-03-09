import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ShareModule } from '../share/share.module';

import { GoogleLoadingComponent } from './google-loading/google-loading.component';
import {
  GoogleEventControlComponent,
  GoogleEventFormComponent,
  GoogleEventsListComponent,
} from './google-events';
import {
  GoogleConnectionsListComponent,
  GooglePersonControlComponent,
  GooglePersonFormComponent,
} from './google-people';

const directives = [
  GoogleLoadingComponent,
  GoogleEventsListComponent,
  GoogleEventControlComponent,
  GoogleEventFormComponent,
  GoogleConnectionsListComponent,
  GooglePersonControlComponent,
  GooglePersonFormComponent,
];

@NgModule({
  declarations: [...directives],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ShareModule,
  ],
  exports: [...directives],
})
export class GoogleUiModule {}
