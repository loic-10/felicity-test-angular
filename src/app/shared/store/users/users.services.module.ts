import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffects } from './shared/store/users.effects';
import { UsersService } from './shared/services/users.service';
import { UserFeature } from './shared/slice/users.slice';
import { UsersFilterPipe } from './shared/pipes/users-filter.pipe';

@NgModule({
  imports: [
    StoreModule.forFeature(UserFeature),
    EffectsModule.forFeature([UsersEffects]),
  ],
  declarations: [UsersFilterPipe],
  exports: [UsersFilterPipe],
  providers: [UsersService],
})
export class UsersServicesModule {}
