import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'apps/frontend/src/environments/environment';
import { Subscription } from 'rxjs';
import { Unit } from '../../models/unit';
import { UnitService } from '../../services/unit.service';
declare var $: any;
@Component({
  selector: 'frontend-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
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
    this.unitService.getUnits().subscribe((res) => {
      this.unidades = res;
    });
  }

  ngOnInit(): void {}

  popoverShow(id){ 
    $("#sesion_"+id).popover('show');
  }

  popoverHide(id){ 
    $("#sesion_"+id).popover('hide');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
