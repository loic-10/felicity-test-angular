import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Service,
  ServiceCreate,
  ServiceUpdate,
  Subscription,
} from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Service[]> {
    return this.http.get<Service[]>(`/api/services`);
  }

  public findOne(id: number): Observable<Service> {
    return this.http.get<Service>(`/api/services/${id}`);
  }

  public findAllSubscriptions(id: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`/api/services/${id}/subscriptions`);
  }

  public create(serviceCreate: ServiceCreate): Observable<Service> {
    return this.http.post<Service>(`/api/services`, serviceCreate);
  }

  public update(id: number, serviceUpdate: ServiceUpdate): Observable<Service> {
    return this.http.patch<Service>(`/api/services/${id}`, serviceUpdate);
  }

  public remove(id: number): Observable<null> {
    return this.http.delete<null>(`/api/services/${id}`);
  }
}
