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
  loading: boolean

  constructor(private sUser: UserService, private router: Router) { }

  generateUser() {
    this.loading = true
    if (!localStorage.getItem('user')) {
      this.sUser.createUser().pipe(take(1)).subscribe((res: number) => {
        this.loading = false
        localStorage.setItem('user', res.toString())
        this.router.navigate(['/dash/learn'])
      })
    } else {
      this.loading = false
      this.router.navigate(['/dash/learn'])
    }
  }
}
