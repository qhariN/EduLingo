import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'frontend-forbidden',
  templateUrl: './forbidden.component.html',
  styles: []
})
export class ForbiddenComponent {

  constructor(private sAuth: AuthService) { }

  goBack() {
    this.sAuth.goBack()
  }
}
