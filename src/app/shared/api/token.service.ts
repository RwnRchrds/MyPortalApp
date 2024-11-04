import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {LoginModel} from "./models/request/login-model";
import {TokenRequestModel} from "./models/request/token-request-model";
import {catchError, map, Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AppError} from "../errors/app-error";
import {RefreshTokenRequestModel} from "./models/request/refresh-token-request-model";
import {TokenResponseModel} from "./models/response/token-response-model";
import {RevokeTokenRequestModel} from "./models/request/revoke-token-request-model";

@Injectable({
  providedIn: 'root'
})
export class TokenService extends ApiService {

  getTokenWithCredentials(credentials: LoginModel): Observable<TokenResponseModel> {
    let request = new TokenRequestModel(credentials);
    let payload = request.toHttpParams();
    return this.http.post<TokenResponseModel>(`${this.basePath}/connect/token`, payload).pipe(map((response: TokenResponseModel) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      if (error.error.error_description === "invalid_username_or_password") {
        throw new AppError(error, 'Invalid username or password.');
      }
      else {
        throw new AppError(error, error.message);
      }
    }));
  }

  getTokenWithRefreshToken(refreshToken: string): Observable<TokenResponseModel> {
    let requestModel = new RefreshTokenRequestModel(refreshToken);
    let payload = requestModel.toHttpParams();
    return this.http.post<TokenResponseModel>(`${this.basePath}/connect/token`, payload).pipe(map((response: TokenResponseModel) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      throw new AppError(error, error.message);
    }));
  }

  revokeRefreshToken(refreshToken: string): Observable<any> {
    let requestModel = new RevokeTokenRequestModel(refreshToken, 'refresh_token');
    let payload = requestModel.toHttpParams();
    return this.http.post(`${this.basePath}/connect/revocation`, payload).pipe(map(response => {
      return response
    }), catchError((error: HttpErrorResponse) => {
      throw new AppError(error, error.message);
    }));
  }
}
