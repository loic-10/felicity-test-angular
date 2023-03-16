import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SubscriptionsEffects } from './shared/store/subscriptions.effects';
import { SubscriptionsService } from './shared/services/subscriptions.service';
import { SubscriptionFeature } from './shared/slice/subscriptions.slice';
import { SubscriptionsFilterPipe } from './shared/pipes/subscriptions-filter.pipe';

@NgModule({
  imports: [
    StoreModule.forFeature(SubscriptionFeature),
    EffectsModule.forFeature([SubscriptionsEffects]),
  ],
  declarations: [SubscriptionsFilterPipe],
  exports: [SubscriptionsFilterPipe],
  providers: [SubscriptionsService],
})
export class SubscriptionsServicesModule {}
