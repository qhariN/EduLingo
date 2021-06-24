import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationAdminComponent } from './layout/navigation-admin/navigation-admin.component';
import { NavigationLandingComponent } from './layout/navigation-landing/navigation-landing.component';
import { RouterModule } from '@angular/router';
import { StepperPracticeComponent } from './layout/stepper-practice/stepper-practice.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperExamComponent } from './layout/stepper-exam/stepper-exam.component';

@NgModule({
  declarations: [
    NavigationAdminComponent,
    NavigationLandingComponent,
    StepperPracticeComponent,
    StepperExamComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CdkStepperModule
  ],
  exports:[
    NavigationAdminComponent,
    NavigationLandingComponent,
    StepperPracticeComponent,
    StepperExamComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
