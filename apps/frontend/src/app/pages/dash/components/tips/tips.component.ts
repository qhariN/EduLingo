import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'apps/frontend/src/app/models/session';
declare var $: any;

@Component({
  selector: 'frontend-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent {

  session: Session

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.session = this.router.getCurrentNavigation().extras.state as Session
    } else {
      this.router.navigate(['/dash/learn'])
    }
  }

  exitTip() {
    //* show loader
    $('#loader').removeClass('loaded')
    this.router.navigate(['/dash/learn'])
  }
}
