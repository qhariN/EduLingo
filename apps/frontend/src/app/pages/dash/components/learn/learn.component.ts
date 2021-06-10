import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Session } from 'apps/frontend/src/app/models/session';
import { environment } from 'apps/frontend/src/environments/environment';
import { Subscription } from 'rxjs';
import { Unit } from '../../../../models/unit';
import { UnitService } from '../../../../services/unit.service';
import { SkillComponent } from '../../../skill/skill.component';
declare var $: any;

@Component({
  selector: 'frontend-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  year = new Date().getFullYear(); //* Current year for footer
  appVersion = environment.appVersion;
  unidades: Array<Unit>;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public sAuth0: AuthService,
    public unitService: UnitService,
    private router: Router
  ) {
    this.unitService.getUnits().subscribe(res => {
      for(let unit of res) {
        unit.section.forEach((section, index) => {
          let prevsection = unit.section[index - 1]
          section.active = !(prevsection? (prevsection.session.filter(v => v.progress[0]?.status === 1).length < prevsection.session.length? true : false) : false)
          for(let session of section.session) {
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRandomBg() {
    const arr = ['bg-primary', 'bg-success', 'bg-info', 'bg-danger']
    const random = Math.floor(Math.random() * arr.length)
    return arr[random]
  }

  newPractice(){
    console.log("olademar");
  }

  goToTips(data: any) {
    this.router.navigate(['/dash/tips'], { state: data })
  }

  goToSkill(data: any) {
    //* show loader
    $('#loader').removeClass('loaded')
    SkillComponent.prototype.idsession = data.id
    this.router.navigate(['/skill'])
  }
}
