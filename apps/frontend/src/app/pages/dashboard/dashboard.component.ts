import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { Token } from '@nx-angular/utils';
import { Menu } from '@nx-angular/component-menu';
import { environment } from 'environments/environment';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'frontend-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription()
  year = new Date().getFullYear() //* Current year for footer
  jwt: Token
  appVersion = environment.appVersion
  menu: Menu[]

  constructor(private sAuth: AuthService, private sNotification: NotificationService) { }

  ngOnInit(): void {
    this.menu = this.sAuth.parseMenu()
    this.jwt = this.sAuth.parseJwt()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  logout() {
    this.sNotification.configSwal().fire({
      title: '¿Estás seguro(a)?',
      text: "Estas a punto de salir de tu sesión",
      showCancelButton: true
    }).then((result: any) => {
      //? Aceptó cerrar sesión
      if (result.value) {
        this.sAuth.logout()
      }
    })
  }
}
