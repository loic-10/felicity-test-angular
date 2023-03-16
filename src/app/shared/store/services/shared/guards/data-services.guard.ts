import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceActions, ServiceSelectors } from '../slice/services.slice';
import { Service } from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataServicesGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<true> {
    return this.store.select(ServiceSelectors.selectServices).pipe(
      map((services: Service[]) => {
        if (!services?.length) {
          ServiceActions.tryGetAllServices();
        }
        return true;
      })
    );
  }
}
