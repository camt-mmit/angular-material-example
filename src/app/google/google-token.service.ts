import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  from,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';

import {
  GoogleConfigurationToken,
  GoogleConfiguration,
  TokenData,
} from './models';
import { arrayBufferToBase64URLencode, randomString, sha256 } from './utils';
import { Router } from '@angular/router';

const tokenKeyName = 'google-token';
const codeKeyName = 'google-code-verifier';
const securityKeyName = 'google-security-token';

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const codeUrl = 'https://oauth2.googleapis.com/token';

const randomStringLength = 56;
const securityTokenLength = 16;

@Injectable({
  providedIn: 'root',
})
export class GoogleTokenService {
  private readonly codeVerifier: string;
  private readonly codeChallenge$: Observable<string>;
  private readonly tokenReadySubject = new BehaviorSubject<boolean | null>(
    null,
  );

  private tokenData: TokenData | null = null;

  readonly tokenReady$ = this.tokenReadySubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    @Inject(GoogleConfigurationToken)
    private readonly configuration: GoogleConfiguration,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    const tokenDataText = localStorage.getItem(tokenKeyName);
    if (tokenDataText) {
      this.tokenData = JSON.parse(tokenDataText);
    }

    this.codeVerifier = randomString(randomStringLength);
    this.codeChallenge$ = from(sha256(this.codeVerifier)).pipe(
      map((buffer) => arrayBufferToBase64URLencode(buffer)),
      shareReplay(1),
    );

    this.getAccessToken().subscribe(() => this.emmitTokenReadyEvent());
  }

  private emmitTokenReadyEvent(): void {
    if (this.tokenData) {
      this.tokenReadySubject.next(true);
    } else {
      this.tokenReadySubject.next(false);
    }
  }

  private setTokenData(
    tokenData: TokenData | null,
  ): Observable<TokenData | null> {
    if (tokenData === null) {
      localStorage.removeItem(tokenKeyName);
    } else {
      /**
       * NOTE: Defferent from other OAuth services,
       * Google re-use the same refresh_token for requesting the new access_token
       * so keep it to the new token data.
       */
      if (!tokenData.refresh_token && this.tokenData?.refresh_token) {
        tokenData.refresh_token = this.tokenData.refresh_token;
      }

      if (!tokenData.expires) {
        tokenData.expires =
          new Date().getTime() + (tokenData.expires_in - 10) * 1000;
      }

      localStorage.setItem(tokenKeyName, JSON.stringify(tokenData));
    }

    this.tokenData = tokenData;

    this.emmitTokenReadyEvent();
    return of(this.tokenData);
  }

  private refresh(): Observable<TokenData | null> {
    if (this.tokenData?.refresh_token) {
      return this.http
        .post<TokenData>(codeUrl, {
          client_id: this.configuration.client_id,
          client_secret: this.configuration.client_secret,
          grant_type: 'refresh_token',
          refresh_token: this.tokenData.refresh_token,
        })
        .pipe(
          catchError((err) => {
            console.error(err);
            return of(null);
          }),
          switchMap((tokenData) => this.setTokenData(tokenData)),
        );
    }

    return of(null);
  }

  getAuthorizationLink(): Observable<string> {
    return this.codeChallenge$.pipe(
      map((codeChallenge) => {
        const securityToken = randomString(securityTokenLength);
        localStorage.setItem(codeKeyName, this.codeVerifier);
        localStorage.setItem(securityKeyName, securityToken);

        const url = new URL(authUrl);

        url.searchParams.append('client_id', this.configuration.client_id);
        url.searchParams.append(
          'redirect_uri',
          this.configuration.redirect_uri,
        );
        url.searchParams.append('response_type', 'code');
        const scopeText = this.configuration.scopes.join(' ');
        url.searchParams.append('scope', scopeText);
        url.searchParams.append('code_challenge', codeChallenge);
        url.searchParams.append('code_challenge_method', 'S256');

        const stateParams = new URLSearchParams();
        stateParams.append('internal_redirect_uri', this.router.url);
        stateParams.append('security_token', securityToken);
        url.searchParams.append('state', stateParams.toString());

        /**
         * NOTE: The following 2 parameters, prompt and access_type,
         * are required for getting the refresh_token.
         */
        url.searchParams.append('prompt', 'consent');
        url.searchParams.append('access_type', 'offline');

        return url.toString();
      }),
    );
  }

  requestAccessToken(
    code: string,
    securityToken: string | null,
  ): Observable<boolean> {
    const storedSecurityToken = localStorage.getItem(securityKeyName);

    if (storedSecurityToken && storedSecurityToken === securityToken) {
      return this.http
        .post<TokenData>(codeUrl, {
          client_id: this.configuration.client_id,
          client_secret: this.configuration.client_secret,
          code: code,
          code_verifier: localStorage.getItem(codeKeyName),
          grant_type: 'authorization_code',
          redirect_uri: this.configuration.redirect_uri,
        })
        .pipe(
          catchError((err) => {
            console.error(err);
            return of(null);
          }),
          switchMap((tokenData) => this.setTokenData(tokenData)),
          map((result) => !!result),
        );
    }

    return of(false);
  }

  getAccessToken(): Observable<string | null> {
    if (this.tokenData) {
      const now = new Date().getTime();
      if (this.tokenData.expires! < now) {
        return this.refresh().pipe(
          map((tokenData) => (tokenData ? tokenData.access_token : null)),
        );
      } else {
        return of(this.tokenData.access_token);
      }
    }

    return of(null);
  }

  getAuthorizationHeader(): Observable<string | null> {
    return this.getAccessToken().pipe(
      map((accessToken) =>
        accessToken ? `${this.tokenData?.token_type} ${accessToken}` : null,
      ),
    );
  }

  forceExpires(): void {
    if (this.tokenData) {
      const tokenData = { ...this.tokenData };
      tokenData.expires = 1;
      this.setTokenData(tokenData);
    }
  }

  deleteToken(): void {
    this.setTokenData(null);
  }
}
