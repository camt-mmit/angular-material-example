import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatCheckboxModule,
  MatCheckboxRequiredValidator,
} from '@angular/material/checkbox';

import { ShareModule } from '../share/share.module';

import {
  ExampleFormSimpleControlComponent,
  ExampleFormSimpleDisplayComponent,
  ExampleFormSimpleFormComponent,
} from './example-form-simple';

const directives = [
  ExampleFormSimpleDisplayComponent,
  ExampleFormSimpleControlComponent,
  ExampleFormSimpleFormComponent,
];

@NgModule({
  declarations: [...directives],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ShareModule,
  ],
  exports: [...directives],
})
export class ExampleFormUiModule {}
