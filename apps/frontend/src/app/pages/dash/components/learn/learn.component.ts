import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'apps/frontend/src/environments/environment';
import { Subscription } from 'rxjs';
import { Unit } from '../../../../models/unit';
import { UnitService } from '../../../../services/unit.service';

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
    public unitService: UnitService
  ) {
    this.unitService.getUnits().subscribe(res => {
      for(let unit of res) {
        for(let section of unit.section) {
          for(let session of section.session) {
            if (session.progress.length !== 0 && session.progress[0].status === 1) {
              session.class = 'bg-warning'
            } else {
              session.class = this.getRandomBg()
            }
          }
        }
      }
      this.unidades = res;
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
}
