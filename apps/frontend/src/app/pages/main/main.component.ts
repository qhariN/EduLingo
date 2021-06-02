import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'frontend-main',
  templateUrl: './main.component.html',
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public sAuth0: AuthService) { }

  ngOnInit(): void {
  }

}
