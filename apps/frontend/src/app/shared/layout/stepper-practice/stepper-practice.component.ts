import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'frontend-stepper-practice',
  templateUrl: './stepper-practice.component.html',
  styleUrls: ['./stepper-practice.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperPracticeComponent }]
})
export class StepperPracticeComponent extends CdkStepper {

  @Output() saveclick = new EventEmitter
  @Input() status: number
  @Input() progress: number
}
