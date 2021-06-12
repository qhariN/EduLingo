import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OptionQuestion, Skill } from '../../models/skill';
import { SkillService } from '../../services/skill.service';
declare var $: any;

@Component({
  selector: 'frontend-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit, OnDestroy {

  idSession: number = 1
  subscriptions: Subscription = new Subscription()
  questionsForm: FormArray
  skillData: Skill
  status: number = 0 //! 0 = normal | 1 = correct | 2 = incorrect
  saving: boolean = false
  progress: number = 0 //! 0% - 100%

  constructor(public skillService: SkillService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionsForm = this.fb.array([])
    //* hide loader
    $('#loader').addClass('loaded')
    if (this.idSession) {
      //* generate array form
      this.subscriptions.add(this.skillService.getSkill(this.idSession).subscribe(res => {
        this.skillData = res
        for (let iQuestion in this.skillData.question) {
          this.questionsForm.push(this.fb.array([]))
          for (let option of this.skillData.question[iQuestion].option_question) {
            if (option.flag_estado === 1) (this.questionsForm.get(iQuestion) as FormArray).push(
              this.fb.control(null, [Validators.required])
            )
          }
        }
      }))
    } else {
      this.router.navigate(['/dash/learn'])
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getQuestionForm(index: string): FormArray {
    return this.questionsForm.get(index.toString()) as FormArray
  }

  checkResponse(index: string) {
    this.status = 1 //* correct
    this.getQuestionForm(index).controls.forEach((val, i) => {
      let control = (val.value as OptionQuestion)
      if (control.flag_estado === 0 && control.order !== i + 1)  {
        this.status = 2 //* incorrect
      }
    })
    //* play sound
    let audio = new Audio()
    this.status === 1? audio.src = '../../../assets/mp3/correct.mp3' : audio.src = '../../../assets/mp3/incorrect.mp3'
    audio.load()
    audio.play()
  }

  nextStep() {
    this.status = 0
    let count = 0
    this.questionsForm.controls.forEach(element => {
      if (element.valid) count++
    })
    this.progress = (100 / this.questionsForm.controls.length) * count
  }

  //* método que convierte texto a voz
  textToVoice(text: string) {
    let msg = new SpeechSynthesisUtterance();
    msg.lang = 'en-US';
    msg.text = text;
    msg.volume = 100;
    speechSynthesis.speak(msg);
  }
}
