import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SubscriptionActions,
  SubscriptionSelectors,
} from '../../../../shared/store';

@Component({
  selector: 'app-profile-subscriptions',
  templateUrl: './profile-subscriptions.component.html',
  styleUrls: ['./profile-subscriptions.component.scss'],
})
export class ProfileSubscriptionsComponent implements OnInit {
  selectSubscriptions$ = this.store.select(
    SubscriptionSelectors.selectSubscriptions
  );

  constructor(public store: Store) {
    this.store.dispatch(SubscriptionActions.restartDefaultState());
    this.store.dispatch(SubscriptionActions.tryGetAllSubscriptions());
  }

  ngOnInit(): void {}
}
