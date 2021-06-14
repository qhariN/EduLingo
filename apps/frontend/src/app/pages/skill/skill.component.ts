import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OptionQuestion, Question, Skill } from '../../models/skill';
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
  lasStep: boolean = false

  constructor(public skillService: SkillService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionsForm = this.fb.array([])
    //* hide loader
    $('#loader').addClass('loaded')
    if (this.idSession) {
      //* generate array form
      this.subscriptions.add(this.skillService.getSkill(this.idSession).subscribe(res => {
        this.skillData = res
        for (let question of this.skillData.question) {
          this.questionsForm.push(this.fb.control(null, [Validators.required]))
        }
      }))
    } else {
      this.router.navigate(['/dash/learn'])
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  
  getQuestionForm(index: string): FormControl {
    return this.questionsForm.controls[index]
  }

  //* -------------------------------- type 2 & 5 ------------------------------------

  onAddCheckboxChange(iQuestion: string, option_question: OptionQuestion) {
    if (!this.getQuestionForm(iQuestion).value) {
      let array = []
      array.push(option_question)
      this.getQuestionForm(iQuestion).setValue(array)
    } else {
      let array = this.getQuestionForm(iQuestion).value
      array.push(option_question)
      this.getQuestionForm(iQuestion).setValue(array)
    }
  }

  onDelCheckboxChange(iQuestion: string, iOption: string) {
    let array = this.getQuestionForm(iQuestion).value as OptionQuestion[]
    array.splice(+iOption, 1)
    this.getQuestionForm(iQuestion).setValue(array)

  }

  //* --------------------------------------------------------------------------------

  checkResponse(iQuestion: string) {
    this.status = 1 //* correct
    let question = this.skillData.question[iQuestion] as Question
    switch (question.type) {
      case 1:
        
        break

      case 2:
      case 5:
        if (this.getQuestionForm(iQuestion).value.length !== question.option_question.filter(v => v.flag_estado === 1).length) {
          this.status = 2 //* incorrect
        } else {
          let value2 = this.getQuestionForm(iQuestion).value as OptionQuestion[]
          value2.forEach((value, index) => {
            if (value.flag_estado === 0 && value.order !== index + 1) this.status = 2 //* incorrect
          })
        }
        break

      case 3:
        
        break

      case 4:
      case 6:
        let value4 = this.getQuestionForm(iQuestion).value as OptionQuestion
        if (value4.flag_estado === 0) this.status = 2 //* incorrect
        break

      default:
        break
    }
    //* play sound
    let audio = new Audio()
    this.status === 1? audio.src = '../../../assets/mp3/correct.mp3' : audio.src = '../../../assets/mp3/incorrect.mp3'
    audio.load()
    audio.play()
    //* update progress
    let count = 0
    this.questionsForm.controls.forEach(element => {
      if (element.valid) count++
    })
    this.progress = (100 / this.questionsForm.controls.length) * count
    //* set lasStep if equal to question length
    if (+iQuestion === this.skillData.question.length - 1) this.lasStep = true
  }

  nextStep() {
    this.status = 0
    if (this.lasStep) {
      console.log('GAAAAAAAAAAA')
    }
  }

  //* método que convierte texto a voz
  textToVoice(text: string) {
    let msg = new SpeechSynthesisUtterance()
    msg.lang = 'en-US'
    msg.text = text
    msg.volume = 100
    speechSynthesis.speak(msg)
  }
}
