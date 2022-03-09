import { Component, OnInit } from '@angular/core';
import { GoogleTokenService } from 'src/app/google/google-token.service';

@Component({
  selector: 'app-google-token-management-page',
  templateUrl: './google-token-management-page.component.html',
  styleUrls: ['./google-token-management-page.component.scss'],
})
export class GoogleTokenManagementPageComponent implements OnInit {
  constructor(private readonly tokenService: GoogleTokenService) {}

  ngOnInit(): void {
    return;
  }

  forceExpires(): void {
    this.tokenService.forceExpires();
  }

  deleteToken(): void {
    this.tokenService.deleteToken();
  }
}
