import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'frontend-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public sAuth0: AuthService) { }

  ngOnInit(): void {
  }

}
