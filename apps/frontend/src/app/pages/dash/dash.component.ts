import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'apps/frontend/src/environments/environment';

@Component({
  selector: 'frontend-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent {
  year = new Date().getFullYear(); //* Current year for footer
  appVersion = environment.appVersion

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public sAuth0: AuthService
  ) { }
}
