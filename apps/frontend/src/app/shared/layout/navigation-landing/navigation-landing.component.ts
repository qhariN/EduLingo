import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'frontend-navigation-landing',
  templateUrl: './navigation-landing.component.html',
  styleUrls: ['./navigation-landing.component.scss']
})
export class NavigationLandingComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public sAuth0: AuthService) { }

  ngOnInit(): void {
  }

}
