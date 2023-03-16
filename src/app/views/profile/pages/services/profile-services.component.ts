import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ServiceActions,
  ServiceSelectors,
  UserSelectors,
} from '../../../../shared/store';
import { MatDialog } from '@angular/material/dialog';
import { ServiceFormComponent } from '../../../../shared/components';

@Component({
  selector: 'app-profile-services',
  templateUrl: './profile-services.component.html',
  styleUrls: ['./profile-services.component.scss'],
})
export class ProfileServicesComponent implements OnInit {
  selectServices$ = this.store.select(ServiceSelectors.selectServices);
  selectCurrentUser$ = this.store.select(UserSelectors.selectCurrentUser);

  constructor(public dialog: MatDialog, public store: Store) {
    this.store.dispatch(ServiceActions.restartDefaultState());
    this.store.dispatch(ServiceActions.tryGetAllServices());
  }

  ngOnInit(): void {}

  openModal() {
    this.dialog.open(ServiceFormComponent, {
      width: '1000px',
      autoFocus: false,
    });
  }
}
