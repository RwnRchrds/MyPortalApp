import {LoginModel} from "./login-model";
import {HttpParams} from "@angular/common/http";

export class TokenRequestModel {
  client_id: string = '7A0B5192-44D5-4514-9418-DE4AF7974182';
  grant_type: string = 'password';
  scope: string = 'myportal offline_access';
  username: string;
  password: string;

  constructor(credentials: LoginModel) {
    this.username = credentials.username;
    this.password = credentials.password;
  }

  toHttpParams(): HttpParams {
    return new HttpParams()
      .set('client_id', this.client_id)
      .set('grant_type', this.grant_type)
      .set('scope', this.scope)
      .set('username', this.username)
      .set('password', this.password);
  }
}
