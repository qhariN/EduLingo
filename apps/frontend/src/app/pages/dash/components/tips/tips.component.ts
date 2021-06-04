import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'apps/frontend/src/app/models/session';


@Component({
  selector: 'frontend-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  session: Session

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.session = this.router.getCurrentNavigation().extras.state as Session
    } else {
      this.router.navigate(['/dash/learn'])
    }
  }

  ngOnInit(): void {
    console.log(this.session)
  }
}
