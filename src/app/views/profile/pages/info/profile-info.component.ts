import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions, UserSelectors } from '../../../../shared/store';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileInfoComponent implements OnInit {
  selectUser$ = this.store.select(UserSelectors.selectCurrentUser);
  selectUserLoading$ = this.store.select(UserSelectors.selectUserLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.store.dispatch(UserActions.tryGetProfile());
  }
}
