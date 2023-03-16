import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataServicesGuard, DataUsersGuard } from './shared/store';

const routes: Routes = [
  {
    path: '',
    canActivate: [DataServicesGuard, DataUsersGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./views/home/home.views.module').then(
            (m) => m.HomeViewsModule
          ),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./views/services/services.views.module').then(
            (m) => m.ServicesViewsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/profile/profile.views.module').then(
            (m) => m.ProfileViewsModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
