import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleFormComponent } from './pages/example-form/example-form.component';
import { ExampleFormSimpleDisplayPageComponent } from './pages/example-form-simple-display-page/example-form-simple-display-page.component';
import { ExampleFormSimpleUpdatePageComponent } from './pages/example-form-simple-update-page/example-form-simple-update-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleFormComponent,
    children: [
      { path: '', redirectTo: 'display', pathMatch: 'full' },
      { path: 'display', component: ExampleFormSimpleDisplayPageComponent },
      { path: 'update', component: ExampleFormSimpleUpdatePageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleFormRoutingModule {}
