import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'apps/frontend/src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'frontend-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription()
  year = new Date().getFullYear() //* Current year for footer
  appVersion = environment.appVersion
  constructor(@Inject(DOCUMENT) public document: Document, public sAuth0: AuthService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
