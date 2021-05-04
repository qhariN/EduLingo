import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { Router } from '@angular/router';
import { AuthUtilService } from '@nx-angular/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthUtilService {

  esPassword: boolean

  constructor(private http: HttpClient, private router: Router) {
    super(router)
    this.getSession()
  }

  login(user: any) {
    const body = new HttpParams().set('username', user.username).set('password', user.password).set('grant_type', 'password')
    return this.auth(body)
  }

  refreshToken() {
    const body = new HttpParams().set('refresh_token', sessionStorage.getItem('refresh_token')).set('grant_type', 'refresh_token')
    return this.auth(body)
  }

  private auth(body: HttpParams) {
    const endpoint = `${environment.url}${environment.api.auth}/token`
    return this.http.post(endpoint, body, environment.basicAuth).pipe(map((data: Auth) => {
      if (data) {
        this.setSessionStorage(data)
        this.token = data.access_token
        this.esPassword = data.esPwd
      }
      return data
    }))
  }

  logout() {
    sessionStorage.clear()
    this.getSession()
    this.router.navigate(['/login'])
  }

  savePassword(body: any) {
    const endpoint = `${environment.url}/security/username/update-password`
    return this.http.put(endpoint, body)
  }

  private setSessionStorage(data: Auth) {
    sessionStorage.setItem('token', data.access_token)
    sessionStorage.setItem('refresh_token', data.refresh_token)
  }

  getSession() {
    this.token = sessionStorage.getItem('token')
    this.esPassword = JSON.parse(sessionStorage.getItem('esPwd'))
  }
}
