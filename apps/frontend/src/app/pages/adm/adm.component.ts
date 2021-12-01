import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';
declare const $;

@Component({
  selector: 'frontend-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss'],
})
export class AdmComponent implements OnInit {
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
