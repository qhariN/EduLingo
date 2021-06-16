import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'frontend-stepper-practice',
  templateUrl: './stepper-practice.component.html',
  styleUrls: ['./stepper-practice.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperPracticeComponent }]
})
export class StepperPracticeComponent extends CdkStepper {

  @Output() checkClick = new EventEmitter
  @Output() nextClick = new EventEmitter
  @Input() status: number = 0 //! 0 = normal | 1 = correct | 2 = incorrect
  @Input() saving: boolean
  @Input() progress: number

}
