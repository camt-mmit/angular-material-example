import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

import { environment } from 'src/environments/environment';

import { GoogleConfigurationToken } from './google/models';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    PortalModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
  ],
  providers: [
    {
      provide: GoogleConfigurationToken,
      useValue: environment.googleConfiguration,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    readonly matIconRegistry: MatIconRegistry,
    readonly domSanitizer: DomSanitizer,
  ) {
    matIconRegistry.addSvgIconInNamespace(
      'icons',
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/GitHub-Mark.svg',
      ),
    );
  }
}
