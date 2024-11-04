import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {catchError, map, Observable} from "rxjs";
import {ErrorResponseModel} from "./models/response/error-response-model";
import {UserInfoResponseModel} from "./models/response/user-info-response-model";
import {ChangePasswordRequestModel} from "./models/request/change-password-request-model";
import {AppError} from "../errors/app-error";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ApiService {
  getUserInfo(): Observable<UserInfoResponseModel> {
    return this.http.get<UserInfoResponseModel>(`${this.basePath}/api/auth/userInfo`)
      .pipe(map((response: UserInfoResponseModel) => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw this.getError(err);
    }));
  }
  changePassword(passwordChange: ChangePasswordRequestModel) {
    return this.http.put(`${this.basePath}/api/auth/password`, passwordChange)
      .pipe(catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
}

