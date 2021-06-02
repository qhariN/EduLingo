import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationAdminComponent } from './layout/navigation-admin/navigation-admin.component';
import { NavigationLandingComponent } from './layout/navigation-landing/navigation-landing.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavigationAdminComponent,
    NavigationLandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavigationAdminComponent,
    NavigationLandingComponent
  ]
})
export class SharedModule { }
