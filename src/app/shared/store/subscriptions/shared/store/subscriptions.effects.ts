import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import iziToast from 'izitoast';
import { SubscriptionActions } from '../slice/subscriptions.slice';
import { Subscription } from '../../../../interfaces';
import { SubscriptionsService } from '../services/subscriptions.service';

@Injectable()
export class SubscriptionsEffects {
  tryGetAllSubscriptions = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubscriptionActions.tryGetAllSubscriptions),
      switchMap(() => {
        return this.subscriptionsService.findAll().pipe(
          map((subscriptions: Subscription[]) =>
            SubscriptionActions.successGetAllSubscriptions({ subscriptions })
          ),
          catchError((error) => {
            error = error?.error || error;

            this.store.dispatch(
              SubscriptionActions.successGetAllSubscriptions({
                error: error?.message,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryGetOneSubscription = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubscriptionActions.tryGetOneSubscription),
      switchMap(({ id }) => {
        return this.subscriptionsService.findOne(id).pipe(
          map((subscription: Subscription) => {
            return SubscriptionActions.successGetOneSubscription({
              subscription,
            });
          }),
          catchError((error) => {
            error = error?.error || error;

            this.store.dispatch(
              SubscriptionActions.successGetOneSubscription({
                error: error?.message,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryCreateSubscriptionDto = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubscriptionActions.tryCreateSubscriptionDto),
      switchMap(({ subscriptionCreate }) => {
        return this.subscriptionsService.create(subscriptionCreate).pipe(
          map((subscription) => {
            const message = `Subscription ${subscription?.id} created successfully!`;
            if (subscription) {
              iziToast.success({ message });
              this.store.dispatch(
                SubscriptionActions.tryGetOneSubscription({
                  id: subscription?.id,
                })
              );
              this.store.dispatch(SubscriptionActions.tryGetAllSubscriptions());
            }
            return SubscriptionActions.successCreateSubscriptionDto({
              subscription,
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              SubscriptionActions.successCreateSubscriptionDto({
                error: error?.message || error,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryUpdateSubscriptionDto = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubscriptionActions.tryUpdateSubscriptionDto),
      switchMap(({ id, subscriptionUpdate }) => {
        return this.subscriptionsService.update(id, subscriptionUpdate).pipe(
          map((subscription) => {
            const message = `Subscription ${subscription?.id} updated successfully!`;
            if (subscription) {
              iziToast.success({ message });
              this.store.dispatch(
                SubscriptionActions.tryGetOneSubscription({
                  id: subscription?.id,
                })
              );
              this.store.dispatch(SubscriptionActions.tryGetAllSubscriptions());
            }
            return SubscriptionActions.successUpdateSubscriptionDto({
              subscription,
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              SubscriptionActions.successUpdateSubscriptionDto({
                error: error?.message || error,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryDeleteSubscriptionDto = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubscriptionActions.tryDeleteSubscriptionDto),
      switchMap(({ id }) => {
        return this.subscriptionsService.remove(id).pipe(
          map(() => {
            const message = `Subscription ${id} deleted successfully!`;
            iziToast.success({ message });
            this.store.dispatch(SubscriptionActions.tryGetAllSubscriptions());
            return SubscriptionActions.successDeleteSubscriptionDto({
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              SubscriptionActions.successDeleteSubscriptionDto({
                error: error?.message || error,
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
    private subscriptionsService: SubscriptionsService,
    private store: Store
  ) {}
}
