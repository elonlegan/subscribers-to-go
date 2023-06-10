import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country, CountryList } from '@app/models';

import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/countries`;

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  get(params?) {
    return this.http.get<CountryList>(baseUrl, { params });
  }
}
