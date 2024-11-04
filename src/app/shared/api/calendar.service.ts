import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import {CalendarEventModel} from "./models/response/calendar-event-model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends ApiService {
  getCalendarEventsByPerson(personId: string, dateFrom: Date, dateTo: Date) {
    let payload = new HttpParams();
    payload.append('dateFrom', dateFrom.toUTCString());
    payload.append('dateTo', dateTo.toUTCString());
    return this.http.get<CalendarEventModel[]>(`${this.basePath}/api/people/${personId}/calendar`, {params: payload}).pipe(map((response: CalendarEventModel[]) => {
      return response;
    }));
  }
}
