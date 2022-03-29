import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'frontend-navigation-landing',
  templateUrl: './navigation-landing.component.html',
  styleUrls: ['./navigation-landing.component.scss']
})
export class NavigationLandingComponent {

  constructor(@Inject(DOCUMENT) public document: Document) { }

}
