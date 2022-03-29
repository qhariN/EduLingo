import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'frontend-navigation-landing',
  templateUrl: './navigation-landing.component.html',
  styleUrls: ['./navigation-landing.component.scss']
})
export class NavigationLandingComponent {

  user: string

  constructor(private sUser: UserService, private router: Router) { }

  generateUser() {
    if (!localStorage.getItem('user')) {
      this.sUser.createUser().pipe(take(1)).subscribe((res: number) => {
        localStorage.setItem('user', res.toString())
        this.router.navigate(['/dash/learn'])
      })
    } else {
      this.router.navigate(['/dash/learn'])
    }
  }
}
