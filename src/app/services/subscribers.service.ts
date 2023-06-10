import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber, SubscriberList } from '@app/models';

import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/subscribers`;

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<SubscriberList[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Subscriber>(`${baseUrl}/${id}`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
