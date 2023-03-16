import { Pipe, PipeTransform } from '@angular/core';
import { FilterSubscriptions, Subscription } from '../../../../interfaces';

@Pipe({
  name: 'subscriptionsFilter',
})
export class SubscriptionsFilterPipe implements PipeTransform {
  transform(
    subscriptions: Subscription[] | null,
    filterSubscriptions: FilterSubscriptions
  ): Subscription[] {
    return subscriptions && subscriptions.length
      ? subscriptions.filter(({ total_price }: Subscription) =>
          total_price
            ?.toString()
            .toLowerCase()
            .includes(filterSubscriptions.search.toLowerCase())
        )
      : [];
  }
}
