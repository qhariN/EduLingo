import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationAdminComponent } from './layout/navigation-admin/navigation-admin.component';
import { NavigationLandingComponent } from './layout/navigation-landing/navigation-landing.component';
import { RouterModule } from '@angular/router';
import { StepperPracticeComponent } from './layout/stepper-practice/stepper-practice.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperExamComponent } from './layout/stepper-exam/stepper-exam.component';
import { ModalResultsComponent } from './layout/modal-results/modal-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavigationAdminComponent,
    NavigationLandingComponent,
    StepperPracticeComponent,
    StepperExamComponent,
    ModalResultsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CdkStepperModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    NavigationAdminComponent,
    NavigationLandingComponent,
    StepperPracticeComponent,
    StepperExamComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
