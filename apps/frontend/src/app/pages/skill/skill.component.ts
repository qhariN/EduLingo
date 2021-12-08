import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable, Subject, Subscription } from 'rxjs';
import { OptionQuestion, Question, Skill } from '../../models/skill';
import { SkillService } from '../../services/skill.service';
import { repeatWhen, takeUntil, tap} from 'rxjs/operators';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { ModalResultsComponent } from '../../shared/layout/modal-results/modal-results.component';
declare const $;

@Component({
  selector: 'frontend-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  providers: [NgbModalConfig]
})
export class SkillComponent implements OnInit, OnDestroy {


  idSession: number
  subscriptions: Subscription = new Subscription()
  questionsForm: FormArray
  skillData: Skill
  status: number = 0 //! 0 = normal | 1 = correct | 2 = incorrect
  saved: number = null
  progress: number = 0 //! 0% - 100%
  lasStep: boolean = false
  total_writing = 0;
  total_listening = 0;
  total_speaking = 0; 
  
 //* variables para medir tiempo por pregunta
  timerGlobal = 20;
  timeTotal = 0;
  time = 0;
  behavior = new BehaviorSubject(0);
  timer: Observable<number>;

  inicio = new Subject<void>(); 
  fin = new Subject<void>();

  constructor(public skillService: SkillService, private router: Router, private fb: FormBuilder,
    private modalService: NgbModal, config: NgbModalConfig) { 
      //* configurar modal
      config.backdrop = 'static'; 
    }

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

      //* prueba de tiempo por preguntas
      this.timer = interval(1000).pipe(
        tap(second => this.behavior.next(second)),
        takeUntil(this.fin),
        repeatWhen(() => this.inicio)
      );
      this.time = 0;

      this.timer.subscribe(data => {
        this.time = this.timerGlobal + (data*(-1))
        if(this.time <= 0){
          this.fin.next();
        }
      });

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
    this.fin.next(); 
    this.status = 1 //* correct
    this.getQuestionForm(iQuestion).value.time=(this.timerGlobal - this.time);
    this.getQuestionForm(iQuestion).value.status = 'CORRECTO';

    let question = this.skillData.question[iQuestion] as Question

    let tiempo_inicial = (this.timerGlobal) * 1000;
    let puntaje_inicial = 10;
    let puntaje_x_tiempo_inicial = puntaje_inicial / tiempo_inicial;
    let tiempo_final = (this.time)*1000;   
    this.timeTotal += (this.timerGlobal - this.time);

    switch (question.type) {
      case 2:
        this.total_writing += (puntaje_x_tiempo_inicial*tiempo_final);
      case 5:
        this.total_listening += (puntaje_x_tiempo_inicial*tiempo_final);
      case 7:
        let correct = true;
        if (this.getQuestionForm(iQuestion).value.length !== question.option_question.filter(v => v.flag_estado === 1).length) {
          this.status = 2 //* incorrect
          this.getQuestionForm(iQuestion).value.status = 'INCORRECTO';
          correct = false;
        } else {
          let value2 = this.getQuestionForm(iQuestion).value as OptionQuestion[]
          for (let i = 0; i < value2.length; i++) {
            if (value2[i].flag_estado === 0 || value2[i].order != i + 1) {
              this.status = 2 //* incorrect
              this.getQuestionForm(iQuestion).value.status = 'INCORRECTO';
              correct = false;
              break;
            }
          }
        }
        if(correct){
          this.total_speaking += (puntaje_x_tiempo_inicial*tiempo_final);
        }

        break;
      case 1:
        this.total_writing += (puntaje_x_tiempo_inicial*tiempo_final);
      case 3:
        this.total_writing += (puntaje_x_tiempo_inicial*tiempo_final);
      case 4:
        this.total_writing += (puntaje_x_tiempo_inicial*tiempo_final);
      case 6:
        let value4 = this.getQuestionForm(iQuestion).value as OptionQuestion
        if (value4.flag_estado === 0) {
          this.status = 2 //* incorrect
          this.getQuestionForm(iQuestion).value.status = 'INCORRECTO';
        }else{
          this.total_listening += (puntaje_x_tiempo_inicial*tiempo_final);
        }
        break;
      default:
        break;
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
    this.inicio.next(); 
    this.status = 0
    //* Check if all responses are valid
    if (this.lasStep) {
      let valid = true
      this.questionsForm.controls.forEach((val, i) => {
        let question = this.skillData.question[i] as Question
        switch (question.type) {
          case 2:
          case 5:
          case 7:
            if (this.getQuestionForm(i.toString()).value.length !== question.option_question.filter(v => v.flag_estado === 1).length) {
              valid = false
            } else {
              let value2 = this.getQuestionForm(i.toString()).value as OptionQuestion[]
              value2.forEach((value, index) => {
                if (value.flag_estado === 0 && value.order !== index + 1) valid = false
              })
            }
            break
    
          case 1:
          case 3:
          case 4:
          case 6:
            let value4 = this.getQuestionForm(i.toString()).value as OptionQuestion
            if (value4.flag_estado === 0) valid = false //* incorrect
            break
    
          default:
            break
        }
      })
      //* Save progress or show failed message
      if (valid) {
        this.saved = 1
        let total_questions = this.skillData.question.length;
        //!servicio para guardar el progreso equisdé
        let progress ={
          session:{
              id: this.idSession
          },
          time: this.timeTotal,
          points_writing: this.total_writing / total_questions,
          points_listening: this.total_listening / total_questions,
          points_speaking: this.total_speaking / total_questions
        }
        this.skillService.postProgressSkill(progress).subscribe(result => {
          console.log(result);
        });
      } else {
        this.saved = 0
      }
      this.fin.next();
    }
  }

  //* método que convierte texto a voz
  textToVoiceEn(text: string) {
    let msg = new SpeechSynthesisUtterance()
    msg.lang = 'en-US'
    msg.text = text
    msg.volume = 100
    speechSynthesis.speak(msg)
  }

  textToVoiceEs(text: string) {
    let msg = new SpeechSynthesisUtterance()
    msg.lang = 'es-MX'
    msg.text = text
    msg.volume = 100
    speechSynthesis.speak(msg)
  }

  openResults(){
    ModalResultsComponent.prototype.data = this.questionsForm.value;
    ModalResultsComponent.prototype.dataSkill = this.skillData.question;
    this.modalService.open(ModalResultsComponent,{windowClass: 'modal-holder', centered: true, size: 'lg', backdrop: 'static'}).result.then((result) => {
    });
  }
  
}
