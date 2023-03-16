import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserActions, UserSelectors } from '../slice/users.slice';

@Injectable({
  providedIn: 'root',
})
export class DataUsersGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<true> {
    return this.store.select(UserSelectors.selectCurrentUser).pipe(
      map((user) => {
        if (!user) {
          UserActions.tryGetProfile();
        }
        return true;
      })
    );
  }
}
