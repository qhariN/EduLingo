import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { NotificationService } from '@services/notification.service';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  refreshingAccessToken: boolean;
  accessTokenRefreshed: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private sNotification: NotificationService, private sAuthentication: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //* Handle the request
    if (this.sAuthentication.token) {
      request = this.addToken(request, this.sAuthentication.token)
    }

    //* call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        //* 401 error so we are unauthorized
        if (error.status === 401) {
          if (String(error.error.error_description).includes('Invalid refresh token (expired):')) {
            this.sAuthentication.logout()
            this.router.navigate(['/login'])
            $('.modal').modal('hide')
            this.sNotification.notify(error.status, error.error.error)
          }
          this.sAuthentication.beforeRefreshToken()
          //* refresh the access token
          return this.handle401Error(request, next)
        } else {
          if (error.error.message) {
            this.sNotification.notify(error.status, error.error.message)
          } else {
            this.sNotification.notify(error.status, error.error.error)
          }
          return throwError(error)
        }
      })
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshingAccessToken) {
      this.refreshingAccessToken = true
      this.accessTokenRefreshed.next(null)
      return this.sAuthentication.refreshToken().pipe(
        switchMap((response: any) => {
          this.refreshingAccessToken = false
          this.accessTokenRefreshed.next(response.access_token)
          return next.handle(this.addToken(request, response.access_token))
        })
      )
    } else {
      return this.accessTokenRefreshed.pipe(
        filter(token => token != null),
        take(1),
        switchMap((jwt: string) => {
          return next.handle(this.addToken(request, jwt))
        })
      )
    }
  }
}
