import {
  CUSTOM_ELEMENTS_SCHEMA,
  LOCALE_ID,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusDirective } from './directives/status.directive';
import { MaterialModule } from './modules/material.module';
import {
  HeaderComponent,
  LoaderComponent,
  RegisterComponent,
  ServiceFormComponent,
  ServiceItemComponent,
  SubscriptionFormComponent,
  SubscriptionsTableComponent,
} from './components';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {
  ServicesServicesModule,
  SubscriptionsServicesModule,
  UsersServicesModule,
} from './store';
import localeFr from '@angular/common/locales/fr';
import { CookieService } from 'ngx-cookie-service';
registerLocaleData(localeFr, 'fr');

// Auth components start

const AUTH_COMPONENTS_SHARED = [RegisterComponent];

// const AUTH_COMPONENTS_DECLARED = [
// ];

// Auth components end

// Subscriptions components start

const SUBSCRIPTIONS_COMPONENTS_SHARED = [
  SubscriptionsTableComponent,
  SubscriptionFormComponent,
];

// const SUBSCRIPTIONS_COMPONENTS_DECLARED = [
// ];

// Subscriptions components end

// Services components start

const SERVICES_COMPONENTS_SHARED = [ServiceItemComponent, ServiceFormComponent];

// const SERVICES_COMPONENTS_DECLARED = [
// ];

// Services components end

const COMPONENTS_SHARED = [
  HeaderComponent,
  LoaderComponent,
  ...SERVICES_COMPONENTS_SHARED,
  ...SUBSCRIPTIONS_COMPONENTS_SHARED,
  ...AUTH_COMPONENTS_SHARED,
];

const COMPONENTS_DECLARED = [
  StatusDirective,
  // ...SUBSCRIPTIONS_COMPONENTS_DECLARED,
];

const MODULES = [
  MaterialModule,
  CommonModule,
  HttpClientModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  ServicesServicesModule,
  SubscriptionsServicesModule,
  UsersServicesModule,
];

const IMPORTS = [RouterModule];

@NgModule({
  imports: [...MODULES, ...IMPORTS],
  declarations: [...COMPONENTS_SHARED, ...COMPONENTS_DECLARED],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: LOCALE_ID, useValue: 'fr' }, // 'de' for Germany, 'fr' for France ...
    CookieService,
  ],
  exports: [...COMPONENTS_SHARED, ...MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
