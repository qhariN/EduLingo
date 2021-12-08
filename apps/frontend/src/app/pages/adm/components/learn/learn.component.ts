import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Session } from '../../../../models/session';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { Unit } from '../../../../models/unit';
import { UnitService } from '../../../../services/unit.service';
import { ExamComponent } from '../../../exam/exam.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $;
declare const bootstrap;

@Component({
  selector: 'frontend-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  year = new Date().getFullYear(); //* Current year for footer
  appVersion = environment.appVersion;
  icons = ['airplane', 'athlete', 'baby', 'bag', 'ball', 'bandaid', 'bike', 'broom', 'chef', 'compass', 'dictionary', 'dumbbells', 'egg', 'failed', 'father', 'firstaid', 'fish', 'ghost', 'glasses', 'gold', 'hammer', 'hand', 'heart', 'heelshoes', 'hourglass', 'img_main', 'learn', 'magnet', 'message', 'mother', 'paddle', 'paint', 'palmtree', 'pencil', 'pig', 'question', 'sandwich', 'skate', 'sock', 'sun', 'taxi', 'temple', 'tower', 'trunk']
  unidades: Array<Unit>;
  createForm: FormGroup
  newModal

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public sAuth0: AuthService,
    public unitService: UnitService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUnits()
    this.createForm = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      icon: this.fb.control(null, [Validators.required]),
      row: this.fb.control(null, [Validators.required]),
      number: this.fb.control(null, [Validators.required])
    })
    this.newModal = new bootstrap.Modal(document.getElementById('newSession'), {})
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUnits() {
    this.unitService.getUnitsNoUser().subscribe(res => {
      for(const unit of res) {
        unit.section.forEach((section, i) => {
          for(const session of section.session) {
            session.class = this.getRandomBg()
          }
          section.nSessions = unit.section.slice(0, i + 1).reduce((a, b) => a + b.session.length, 0)
        })
      }
      this.unidades = res
      //* hide loader
      $('#loader').addClass('loaded')
    });
  }

  getRandomBg() {
    const arr = ['bg-primary', 'bg-success', 'bg-info', 'bg-danger']
    const random = Math.floor(Math.random() * arr.length)
    return arr[random]
  }

  goToTips(data: Session) {
    this.router.navigate(['/adm/tips'], { state: data })
  }

  goToSkill(data: Session) {
    $('#loader').removeClass('loaded')
    this.router.navigate(['/adm/session'], { state: data })
  }

  goToExam(unidad){
    $('#loader').removeClass('loaded')
    ExamComponent.prototype.idUnit = unidad.id
    this.router.navigate(['/exam'])
  }

  openNewSession(unit: number) {
    console.log(unit);
    this.newModal.show()
  }

  createSession() {
    const body: Session = {
      name: this.createForm.get('name').value,
      number: this.createForm.get('number').value,
      url: this.createForm.get('icon').value,
      section: {
        id: this.createForm.get('row').value,
      }
    }
    this.subscriptions.add(this.unitService.createSession(body).subscribe(() => {
      this.getUnits()
      this.newModal.hide()
    }))
  }
}
