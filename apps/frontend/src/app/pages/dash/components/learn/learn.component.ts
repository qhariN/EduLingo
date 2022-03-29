import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../../../models/session';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { Unit } from '../../../../models/unit';
import { UnitService } from '../../../../services/unit.service';
import { ExamComponent } from '../../../exam/exam.component';
import { SkillComponent } from '../../../skill/skill.component';
declare const $;

@Component({
  selector: 'frontend-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();
  year = new Date().getFullYear(); //* Current year for footer
  appVersion = environment.appVersion;
  unidades: Array<Unit>;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public unitService: UnitService,
    private router: Router
  ) {
    this.unitService.getUnits().subscribe(res => {
      for(const unit of res) {
        unit.section.forEach((section, index) => {
          const prevsection = unit.section[index - 1]
          section.active = !(prevsection? (prevsection.session.filter(v => v.progress[0]?.status === 1).length < prevsection.session.length? true : false) : false)
          for(const session of section.session) {
            if (session.progress.length !== 0 && session.progress[0].status === 1) {
              session.class = 'bg-warning'
            } else {
              session.class = this.getRandomBg()
            }
          }
        })
      }
      this.unidades = res;
      //* hide loader
      $('#loader').addClass('loaded')
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRandomBg() {
    const arr = ['bg-primary', 'bg-success', 'bg-info', 'bg-danger']
    const random = Math.floor(Math.random() * arr.length)
    return arr[random]
  }

  goToTips(data: Session) {
    this.router.navigate(['/dash/tips'], { state: data })
  }

  goToSkill(data: Session) {
    //* show loader
    $('#loader').removeClass('loaded')
    SkillComponent.prototype.idSession = data.id
    this.router.navigate(['/skill'])
  }
  goToExam(unidad){
    $('#loader').removeClass('loaded')
    ExamComponent.prototype.idUnit = unidad.id
    this.router.navigate(['/exam'])
  }
}
