import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ServicesEffects } from './shared/store/services.effects';
import { ServicesService } from './shared/services/services.service';
import { ServiceFeature } from './shared/slice/services.slice';
import { ServicesFilterPipe } from './shared/pipes/services-filter.pipe';

@NgModule({
  imports: [
    StoreModule.forFeature(ServiceFeature),
    EffectsModule.forFeature([ServicesEffects]),
  ],
  declarations: [ServicesFilterPipe],
  exports: [ServicesFilterPipe],
  providers: [ServicesService],
})
export class ServicesServicesModule {}
