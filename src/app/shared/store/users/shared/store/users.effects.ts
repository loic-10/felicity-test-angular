import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import iziToast from 'izitoast';
import { UserActions } from '../slice/users.slice';
import { User, Subscription } from '../../../../interfaces';
import { UsersService } from '../services/users.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UsersEffects {
  tryGetProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryGetProfile),
      switchMap(() => {
        const userId: number = Number.parseInt(
          this.cookieService.get('userId')
        );
        return this.usersService.findOne(userId).pipe(
          map((user: User) => UserActions.successGetProfile({ user })),
          catchError((error) => {
            error = error?.error || error;
            this.store.dispatch(
              UserActions.successGetProfile({
                error: error?.message,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryGetAllUsers = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryGetAllUsers),
      switchMap(() => {
        return this.usersService.findAll().pipe(
          map((users: User[]) => UserActions.successGetAllUsers({ users })),
          catchError((error) => {
            error = error?.error || error;

            this.store.dispatch(
              UserActions.successGetAllUsers({
                error: error?.message,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryGetOneUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryGetOneUser),
      switchMap(({ id }) => {
        return this.usersService.findOne(id).pipe(
          map((user: User) => {
            return UserActions.successGetOneUser({ user });
          }),
          catchError((error) => {
            error = error?.error || error;

            this.store.dispatch(
              UserActions.successGetOneUser({ error: error?.message })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryLogin),
      switchMap(({ login }) => {
        return this.usersService.login(login).pipe(
          map((user) => {
            this.cookieService.set('userId', user.id?.toString());
            const message = `User ${user?.username} logged successfully!`;
            if (user) {
              iziToast.success({ message });
              this.store.dispatch(UserActions.tryGetProfile());
            }
            return UserActions.successLogin({
              user,
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              UserActions.successLogin({
                error: error?.message || error,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryRegister = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryRegister),
      switchMap(({ register }) => {
        return this.usersService.register(register).pipe(
          map((user) => {
            this.cookieService.set('userId', user.id?.toString());
            const message = `User ${user?.username} recorded successfully!`;
            if (user) {
              iziToast.success({ message });
              this.store.dispatch(UserActions.tryGetProfile());
            }
            return UserActions.successRegister({
              user,
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              UserActions.successRegister({
                error: error?.message || error,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryGetAllSubscriptionsByUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryGetAllSubscriptionsByUser),
      switchMap(({ id }) => {
        return this.usersService.findAllSubscriptions(id).pipe(
          map((subscriptions: Subscription[]) =>
            UserActions.successGetAllSubscriptionsByUser({
              subscriptions,
              id,
            })
          ),
          catchError((error) => {
            error = error?.error || error;
            this.store.dispatch(
              UserActions.successGetAllSubscriptionsByUser({
                id,
                error: error?.message,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store,
    private cookieService: CookieService
  ) {}
}
