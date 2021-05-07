import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
declare var $: any;

@Component({
  selector: 'edulingo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  constructor(@Inject(DOCUMENT) public document: Document, public sAuth0: AuthService) { }

  ngOnInit(): void {
    //* hide loader
    $('#loader').addClass('loaded')
  }
}
