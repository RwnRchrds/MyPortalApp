import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {StringResponseModel} from "./models/response/string-response-model";
import {BulletinSearchOptions} from "./models/request/bulletin-search-options";
import {PageFilter} from "./models/request/page-filter";
import {BulletinPageResponseModel} from "./models/response/bulletin-page-response-model";

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends ApiService {
  getLocalSchoolName(): Observable<StringResponseModel> {
    return this.http.get<StringResponseModel>(`${this.basePath}/api/schools/local/name`).pipe(map((response: StringResponseModel) => {
      return response;
    }));
  }
  getBulletinsPaged(searchOptions: BulletinSearchOptions, pageFilter: PageFilter): Observable<BulletinPageResponseModel> {
    let search = searchOptions.toHttpParams();
    let payload = this.addPaging(search, pageFilter);
    return this.http.get<BulletinPageResponseModel>(`${this.basePath}/api/schools/local/bulletins`, {params: payload}).pipe(map((response: BulletinPageResponseModel) => {
      return response;
    }));
  }
}
