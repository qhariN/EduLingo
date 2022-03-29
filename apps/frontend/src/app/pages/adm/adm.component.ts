import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
    @Inject(DOCUMENT) public document: Document
  ) { }

  ngOnInit(): void {
    //* show loader
    $('#loader').removeClass('loaded')
  }
}
