import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASE_PATH} from "../variables";
import {ErrorResponseModel} from "./models/response/error-response-model";
import {AppError} from "../errors/app-error";
import {PageFilter} from "./models/request/page-filter";

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  protected basePath: string;

  constructor(protected http: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string) {
    this.basePath = basePath;
  }

  getError(error: ErrorResponseModel): AppError {
    return new AppError(error, error.error);
  }

  addPaging(params: HttpParams, pageFilter: PageFilter): HttpParams {
    params = params.set('skip', pageFilter.skip);
    params = params.set('take', pageFilter.take);

    return params;
  }
}
