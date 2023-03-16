import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SubscriptionActions,
  SubscriptionSelectors,
} from '../slice/subscriptions.slice';
import { Subscription } from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataSubscriptionsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<true> {
    return this.store.select(SubscriptionSelectors.selectSubscriptions).pipe(
      map((subscriptions: Subscription[]) => {
        if (!subscriptions?.length) {
          SubscriptionActions.tryGetAllSubscriptions();
        }
        return true;
      })
    );
  }
}
