import { InjectionToken } from '@angular/core';

export type GoogleConfiguration = {
  client_id: string;
  client_secret: string;
  scopes: string[];
  redirect_uri: string;
};

export const GoogleConfigurationToken = new InjectionToken<GoogleConfiguration>(
  'Google configuration',
);

export type TokenData = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
  scope: string;
  expires?: number;
};

export const accessTokenNotFoundFactory = () =>
  new Error('Access token not found!!!');
