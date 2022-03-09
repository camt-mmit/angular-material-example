import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ShareModule } from '../share/share.module';

import { ExampleFormUiModule } from './example-form-ui.module';

import { ExampleFormRoutingModule } from './example-form-routing.module';
import { ExampleFormComponent } from './pages/example-form/example-form.component';
import { ExampleFormSimpleDisplayPageComponent } from './pages/example-form-simple-display-page/example-form-simple-display-page.component';
import { ExampleFormSimpleUpdatePageComponent } from './pages/example-form-simple-update-page/example-form-simple-update-page.component';

@NgModule({
  declarations: [
    ExampleFormComponent,
    ExampleFormSimpleUpdatePageComponent,
    ExampleFormSimpleDisplayPageComponent,
  ],
  imports: [
    CommonModule,
    ExampleFormRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ShareModule,
    ExampleFormUiModule,
  ],
})
export class ExampleFormModule {}
