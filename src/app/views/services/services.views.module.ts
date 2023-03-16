import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
const routes: Routes = [{ path: '', component: ServicesComponent }];

@NgModule({
  declarations: [ServicesComponent],
  imports: [RouterModule.forChild(routes), FormsModule, SharedModule],
})
export class ServicesViewsModule {}
