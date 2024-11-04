import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {UserRequestModel} from "./models/request/user-request-model";
import {catchError, map} from "rxjs";
import {NewEntityResponseModel} from "./models/response/new-entity-response-model";
import {ErrorResponseModel} from "./models/response/error-response-model";
import {AppError} from "../errors/app-error";
import {UserModel} from "./models/response/user-model";
import {HttpParams} from "@angular/common/http";
import {RoleModel} from "./models/response/role-model";
import {SetPasswordRequestModel} from "./models/request/set-password-request-model";
import {SetUserEnabledRequestModel} from "./models/request/set-user-enabled-request-model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  createUser(user: UserRequestModel) {
    return this.http.post<NewEntityResponseModel>(`${this.basePath}/api/users/`, user).pipe(map((response: NewEntityResponseModel) => {
      return response.id;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  getUsers(username: string) {
    let payload = new HttpParams();
    payload = payload.append('username', username);
    return this.http.get<UserModel[]>(`${this.basePath}/api/users`, {params: payload}).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  getUserById(userId: string) {
    return this.http.get<UserModel>(`${this.basePath}/api/users/${userId}`).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  getUserRoles(userId: string) {
    return this.http.get<RoleModel[]>(`${this.basePath}/api/users/${userId}/roles`).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  updateUser(userId: string, data: UserModel) {
    return this.http.put(`${this.basePath}/api/users/${userId}`, data).pipe(catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  deleteUser(userId: string) {
    return this.http.delete(`${this.basePath}/api/users/${userId}`).pipe(catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  setPassword(userId: string, data: SetPasswordRequestModel) {
    return this.http.put(`${this.basePath}/api/users/${userId}/password`, data).pipe(catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  setEnabled(userId: string, data: SetUserEnabledRequestModel) {
    return this.http.put(`${this.basePath}/api/users/${userId}/enabled`, data).pipe(catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
}
