import {HttpParams} from "@angular/common/http";
import {StringHelper} from "../../../helpers/string-helper";

export class BulletinSearchOptions {
  searchText?: string;
  includeStaffOnly: boolean;
  includeExpired: boolean;
  includeUnapproved: boolean;
  includeCreatedBy?: string;

  constructor() {
    this.includeStaffOnly = false;
    this.includeExpired = false;
    this.includeUnapproved = false;
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams();

    params = params.append('includeStaffOnly', this.includeStaffOnly);
    params = params.append('includeExpired', this.includeExpired);
    params = params.append('includeUnapproved', this.includeUnapproved);

    if (!StringHelper.isNullOrWhitespace(this.searchText)) {
      params = params.append('searchText', this.searchText!);
    }
    if (!StringHelper.isNullOrWhitespace(this.includeCreatedBy)) {
      params = params.append('includeCreatedBy', this.includeCreatedBy!);
    }

    return params;
  }
}
