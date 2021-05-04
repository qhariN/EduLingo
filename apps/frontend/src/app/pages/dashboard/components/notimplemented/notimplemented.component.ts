import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'frontend-notimplemented',
  templateUrl: './notimplemented.component.html',
  styles: []
})
export class NotimplementedComponent {

  constructor(private sAuth: AuthService) { }

  goBack() {
    this.sAuth.goBack()
  }
}
