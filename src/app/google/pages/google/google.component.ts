import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GoogleTokenService } from '../../google-token.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss'],
})
export class GoogleComponent implements OnInit {
  tokenReady$!: Observable<boolean | null>;
  authorizationLink$!: Observable<string>;

  constructor(private readonly tokenService: GoogleTokenService) {}

  ngOnInit(): void {
    this.tokenReady$ = this.tokenService.tokenReady$;
    this.authorizationLink$ = this.tokenService.getAuthorizationLink();
  }
}
