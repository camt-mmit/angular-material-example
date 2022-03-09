import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SidenavPortalDirective } from './sidenav-portal.directive';
import { MainContentComponent } from './main-content/main-content.component';
import { IconSpinnerComponent } from './icon-spinner/icon-spinner.component';
import { SimpleFormOptionsDirective } from './simple-form/simple-form-options.directive';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { SimpleFormActionDirective } from './simple-form/simple-form-action.directive';

const directives = [
  SidenavPortalDirective,
  MainContentComponent,
  IconSpinnerComponent,
  SimpleFormOptionsDirective,
  SimpleFormComponent,
  SimpleFormActionDirective,
];

@NgModule({
  declarations: [...directives],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  exports: [...directives],
})
export class ShareModule {}
