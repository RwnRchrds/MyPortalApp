import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import {RoleModel} from "./models/response/role-model";
import {catchError, map} from "rxjs";
import {ErrorResponseModel} from "./models/response/error-response-model";
import {AppError} from "../errors/app-error";
import {TreeNode} from "./models/response/tree-node";
import {RoleRequestModel} from "./models/request/role-request-model";
import {NewEntityResponseModel} from "./models/response/new-entity-response-model";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ApiService {
  getRoles(roleName: string) {
    let payload = new HttpParams();
    payload = payload.append('roleName', roleName);
    return this.http.get<RoleModel[]>(`${this.basePath}/api/roles`, {params: payload}).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  getRoleById(roleId: string) {
    return this.http.get<RoleModel>(`${this.basePath}/api/roles/${roleId}`).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  getPermissionsTree(roleId: string) {
    return this.http.get<TreeNode>(`${this.basePath}/api/roles/${roleId}/permissions`).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  createRole(role: RoleRequestModel) {
    return this.http.post<NewEntityResponseModel>(`${this.basePath}/api/roles`, role).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  updateRole(roleId: string, role: RoleRequestModel) {
    return this.http.put(`${this.basePath}/api/roles`, role).pipe(map(response => {
      return response;
    }), catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
  deleteRole(roleId: string) {
    return this.http.delete(`${this.basePath}/api/roles/${roleId}`).pipe(catchError((err: ErrorResponseModel) => {
      throw new AppError(err, err.error);
    }));
  }
}
