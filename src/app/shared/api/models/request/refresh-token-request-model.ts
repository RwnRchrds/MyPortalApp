import {HttpParams} from "@angular/common/http";

export class RefreshTokenRequestModel {
  client_id: string = '7A0B5192-44D5-4514-9418-DE4AF7974182';
  grant_type: string = 'refresh_token';
  scope: string = 'myportal offline_access';
  refresh_token: string;

  constructor(refreshToken: string) {
    this.refresh_token = refreshToken;
  }

  toHttpParams(): HttpParams {
    return new HttpParams()
      .set('client_id', this.client_id)
      .set('grant_type', this.grant_type)
      .set('scope', this.scope)
      .set('refresh_token', this.refresh_token);
  }
}
