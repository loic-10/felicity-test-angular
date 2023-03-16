import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ServiceActions,
  ServiceSelectors,
  UserSelectors,
} from '../../shared/store';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  selectServices$ = this.store.select(ServiceSelectors.selectServices);
  selectCurrentUser$ = this.store.select(UserSelectors.selectCurrentUser);

  constructor(public store: Store) {
    this.store.dispatch(ServiceActions.restartDefaultState());
    this.store.dispatch(ServiceActions.tryGetAllServices());
  }

  ngOnInit(): void {}
}
