import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'frontend-stepper-exam',
  templateUrl: './stepper-exam.component.html',
  styleUrls: ['./stepper-exam.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperExamComponent}]
})
export class StepperExamComponent extends CdkStepper {

  @Output() checkClick = new EventEmitter
  @Output() nextClick = new EventEmitter
  @Input() status: number = 0 //! 0 = normal | 1 = correct | 2 = incorrect
  @Input() saved: number //! 0 = invalid | 1 = valid
  @Input() progress: number

}
