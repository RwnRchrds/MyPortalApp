import {HttpParams} from "@angular/common/http";

export class RevokeTokenRequestModel {
  token: string;
  token_type_hint: string;

  constructor(token: string, token_type_hint: string) {
    this.token = token;
    this.token_type_hint = token_type_hint;
  }

  toHttpParams(): HttpParams {
    return new HttpParams()
      .set('token', this.token)
      .set('token_type_hint', this.token_type_hint);
  }
}
