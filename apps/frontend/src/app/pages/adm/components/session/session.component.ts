import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill, OptionQuestion, Question, Option } from '../../../../models/skill';
import { SkillService } from '../../../../services/skill.service';
import { Subscription } from 'rxjs';
import { Session } from '../../../../models/session';
declare const $;
declare const bootstrap;

@Component({
  selector: 'frontend-session',
  templateUrl: './session.component.html',
  styleUrls: ['../../../skill/skill.component.scss']
})
export class SessionComponent implements OnInit {

  session: Session
  subscriptions: Subscription = new Subscription()
  questionForm: FormGroup
  setQuestion: Question
  skillData: Skill
  optionsData: Option[]
  newModal
  modifyModal

  constructor(public skillService: SkillService, private router: Router, private fb: FormBuilder) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.session = this.router.getCurrentNavigation().extras.state as Session
    } else {
      this.router.navigate(['/adm/learn'])
    }
    //* hide loader
    setTimeout(() => {
      $('#loader').addClass('loaded')
    })
    this.getSkillData()
    //* get options
    this.subscriptions.add(this.skillService.getOptions().subscribe(res => {
      this.optionsData = res
    }))
  }

  ngOnInit(): void {
    this.newModal = new bootstrap.Modal(document.getElementById('newQuestion'), {})
    this.modifyModal = new bootstrap.Modal(document.getElementById('modifyQuestion'), {})
    this.questionForm = this.fb.group({
      pregunta: this.fb.control(null, [Validators.required]),
      texto: this.fb.control(null, [Validators.required]),
      opciones: this.fb.control(null, [Validators.required]),
      opcionesCorrectas: this.fb.control(null, [Validators.required]),
      imagen: this.fb.control(null, [Validators.required]),
    })
    this.questionForm.get('opciones').valueChanges.subscribe((opciones: Option[]) => {
      const opcionesCorrectas = this.questionForm.get('opcionesCorrectas').value as Option[]
      this.questionForm.get('opcionesCorrectas').setValue(opcionesCorrectas?.filter(opc => opciones.find(v => v.id === opc.id)))
    })
  }

  getSkillData() {
    this.subscriptions.add(this.skillService.getSkillNoRand(this.session.id).subscribe(res => {
      this.skillData = res
    }))
  }

  exitTip() {
    //* show loader
    $('#loader').removeClass('loaded')
    this.router.navigate(['/adm/learn'])
  }

  deactivateSession(id: number) {
    this.subscriptions.add(this.skillService.deactivateSession(id).subscribe(() => {
      this.exitTip()
    }))
  }

  openNewQuestion() {
    this.questionForm.reset()
    this.newModal.show()
  }

  deactivateQuestion(id: number) {
    this.subscriptions.add(this.skillService.deactivateQuestion(id).subscribe(() => {
      this.getSkillData()
    }))
  }

  generateNewQuestion(tipo: number) {
    const opt: OptionQuestion[] = []
    this.questionForm.get('opciones').value.forEach((element: Option) => {
      const fnd = (this.questionForm.get('opcionesCorrectas').value as Option[]).find(el => el.id === element.id)
      opt.push({
        flag_estado: fnd? 1 : 0,
        order: fnd? (this.questionForm.get('opcionesCorrectas').value as Option[]).indexOf(fnd) + 1 : null,
        status: 1,
        option: element
      })
    })
    const body: Question = {
      question: this.questionForm.get('pregunta').value,
      type: tipo,
      text: this.questionForm.get('texto').value,
      img_url: 'https://d2pur3iezf4d1j.cloudfront.net/images/85c5ecb885f7073a3aebeb775946e329',
      status: 1,
      session: {
        id: this.skillData.id
      },
      option_question: opt
    }
    this.subscriptions.add(this.skillService.createQuestion(body).subscribe(r => {
      console.log(r);
      
      this.newModal.hide()
      this.getSkillData()
    }))
  }

  openModifyQuestion(question: Question) {
    this.setQuestion = question
    this.questionForm.setValue({
      pregunta: question.question,
      texto: question.text,
      opciones: question.option_question.map(op => op.option),
      opcionesCorrectas: this.getCorrectOptions(question.option_question).map(op => op.option),
      imagen: question.img_url
    }, { emitEvent: false })
    this.modifyModal.show()
  }

  saveQuestion() {
    const opt: OptionQuestion[] = []
    this.questionForm.get('opciones').value.forEach((element: Option) => {
      const fnd = (this.questionForm.get('opcionesCorrectas').value as Option[]).find(el => el.id === element.id)
      opt.push({
        flag_estado: fnd? 1 : 0,
        order: fnd? (this.questionForm.get('opcionesCorrectas').value as Option[]).indexOf(fnd) + 1 : null,
        status: 1,
        question: {
          id: this.setQuestion.id
        },
        option: element
      })
    })
    const body: Question = {
      id: this.setQuestion.id,
      question: this.questionForm.get('pregunta').value,
      type: this.setQuestion.type,
      text: this.questionForm.get('texto').value,
      img_url: 'https://d2pur3iezf4d1j.cloudfront.net/images/85c5ecb885f7073a3aebeb775946e329',
      status: 1,
      session: {
        id: this.skillData.id
      },
      option_question: opt
    }
    this.subscriptions.add(this.skillService.updateQuestion(body).subscribe(() => {
      this.modifyModal.hide()
      this.getSkillData()
    }))
  }

  getCorrectOption(options: OptionQuestion[]) {
    return options.find(option => option.order !== null)
  }

  getCorrectOptions(options: OptionQuestion[]) {
    return options.filter(option => option.order !== null).sort((a, b) => a.order > b.order ? 1 : -1)
  }

  //* método que convierte texto a voz
  textToVoiceEn(text: string) {
    const msg = new SpeechSynthesisUtterance()
    msg.lang = 'en-US'
    msg.text = text
    msg.volume = 100
    speechSynthesis.speak(msg)
  }

  textToVoiceEs(text: string) {
    const msg = new SpeechSynthesisUtterance()
    msg.lang = 'es-MX'
    msg.text = text
    msg.volume = 100
    speechSynthesis.speak(msg)
  }
}
