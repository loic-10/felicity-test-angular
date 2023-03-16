import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileInfoComponent } from './pages/info/profile-info.component';
import { ProfileServicesComponent } from './pages/services/profile-services.component';
import { ProfileSubscriptionsComponent } from './pages/subscriptions/profile-subscriptions.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'info', component: ProfileInfoComponent },
      { path: 'services', component: ProfileServicesComponent },
      { path: 'subscriptions', component: ProfileSubscriptionsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileServicesComponent,
    ProfileSubscriptionsComponent,
  ],
  bootstrap: [ProfileComponent],
  imports: [RouterModule.forChild(routes), FormsModule, SharedModule],
})
export class ProfileViewsModule {}
