import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {PersonModel} from "./models/response/person-model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends ApiService {
  getPersonByUser(userId: string): Observable<PersonModel | null> {
    return this.http.get<PersonModel | null>(`${this.basePath}/api/users/${userId}/person`).pipe(map((response: PersonModel | null) => {
      return response;
    }));
  }
}
