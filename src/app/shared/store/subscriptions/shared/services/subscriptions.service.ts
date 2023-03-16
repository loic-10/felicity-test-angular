import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  SubscriptionCreate,
  SubscriptionUpdate,
  Subscription,
} from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`/api/subscriptions`);
  }

  public findOne(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`/api/subscriptions/${id}`);
  }

  public create(
    subscriptionCreate: SubscriptionCreate
  ): Observable<Subscription> {
    return this.http.post<Subscription>(
      `/api/subscriptions`,
      subscriptionCreate
    );
  }

  public update(
    id: number,
    subscriptionUpdate: SubscriptionUpdate
  ): Observable<Subscription> {
    return this.http.patch<Subscription>(
      `/api/subscriptions/${id}`,
      subscriptionUpdate
    );
  }

  public remove(id: number): Observable<null> {
    return this.http.delete<null>(`/api/subscriptions/${id}`);
  }
}
