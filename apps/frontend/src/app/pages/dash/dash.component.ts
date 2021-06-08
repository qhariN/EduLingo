import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'apps/frontend/src/environments/environment';
declare var $: any;

@Component({
  selector: 'frontend-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {
  year = new Date().getFullYear(); //* Current year for footer
  appVersion = environment.appVersion

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public sAuth0: AuthService
  ) { }

  ngOnInit(): void {
    //* show loader
    $('#loader').removeClass('loaded')
  }
}
