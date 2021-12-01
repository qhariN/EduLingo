import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
declare const $;

@Component({
  selector: 'frontend-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription()
  year = new Date().getFullYear(); //* Current year for footer
  appVersion = environment.appVersion

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public sAuth0: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //* show loader
    $('#loader').removeClass('loaded')
    this.sAuth0.user$.subscribe(r => {
      if (r.email === 'jhormantito@upeu.edu.pe') {
        this.router.navigate(['/adm/learn'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
