import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import iziToast from 'izitoast';
import { ServiceActions } from '../slice/services.slice';
import { Service, Subscription } from '../../../../interfaces';
import { ServicesService } from '../services/services.service';

@Injectable()
export class ServicesEffects {
  tryGetAllServices = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.tryGetAllServices),
      switchMap(() => {
        return this.servicesService.findAll().pipe(
          map((services: Service[]) =>
            ServiceActions.successGetAllServices({ services })
          ),
          catchError((error) => {
            error = error?.error || error;

            this.store.dispatch(
              ServiceActions.successGetAllServices({
                error: error?.message,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryGetOneService = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.tryGetOneService),
      switchMap(({ id }) => {
        return this.servicesService.findOne(id).pipe(
          map((service: Service) => {
            return ServiceActions.successGetOneService({ service });
          }),
          catchError((error) => {
            error = error?.error || error;

            this.store.dispatch(
              ServiceActions.successGetOneService({ error: error?.message })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryCreateServiceDto = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.tryCreateServiceDto),
      switchMap(({ serviceCreate }) => {
        return this.servicesService.create(serviceCreate).pipe(
          map((service) => {
            const message = `Service ${service?.name} created successfully!`;
            if (service) {
              iziToast.success({ message });
              this.store.dispatch(
                ServiceActions.tryGetOneService({
                  id: service?.id,
                })
              );
              this.store.dispatch(ServiceActions.tryGetAllServices());
            }
            return ServiceActions.successCreateServiceDto({
              service,
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              ServiceActions.successCreateServiceDto({
                error: error?.message || error,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryUpdateServiceDto = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.tryUpdateServiceDto),
      switchMap(({ id, serviceUpdate }) => {
        return this.servicesService.update(id, serviceUpdate).pipe(
          map((service) => {
            const message = `Service ${service?.name} updated successfully!`;
            if (service) {
              iziToast.success({ message });
              this.store.dispatch(
                ServiceActions.tryGetOneService({
                  id: service?.id,
                })
              );
              this.store.dispatch(ServiceActions.tryGetAllServices());
            }
            return ServiceActions.successUpdateServiceDto({
              service,
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              ServiceActions.successUpdateServiceDto({
                error: error?.message || error,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryDeleteServiceDto = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.tryDeleteServiceDto),
      switchMap(({ id }) => {
        return this.servicesService.remove(id).pipe(
          map(() => {
            const message = `Service ${id} deleted successfully!`;
            iziToast.success({ message });
            this.store.dispatch(ServiceActions.tryGetAllServices());
            return ServiceActions.successDeleteServiceDto({
              success: message,
            });
          }),
          catchError((error) => {
            error = error?.error || error;
            iziToast.error({
              message: error?.message || error,
            });
            this.store.dispatch(
              ServiceActions.successDeleteServiceDto({
                error: error?.message || error,
              })
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tryGetAllSubscriptionsByService = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.tryGetAllSubscriptionsByService),
      switchMap(({ id }) => {
        return this.servicesService.findAllSubscriptions(id).pipe(
          map((subscriptions: Subscription[]) =>
            ServiceActions.successGetAllSubscriptionsByService({
              subscriptions,
              id,
            })
          ),
          catchError((error) => {
            error = error?.error || error;
            this.store.dispatch(
              ServiceActions.successGetAllSubscriptionsByService({
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
    private servicesService: ServicesService,
    private store: Store
  ) {}
}
