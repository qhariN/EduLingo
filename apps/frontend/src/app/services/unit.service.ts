import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Session } from '../models/session';
import { Question } from '../models/skill';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root',
})
export class UnitService {

  constructor(private http: HttpClient) { }
  
  getUnits(): Observable<Unit[]> {
    return this.http.post<Unit[]>(`${environment.url}/unit/all/user`, { id: +localStorage.getItem('user') });
  }

  getUnitsNoUser(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${environment.url}/unit/all`);
  }

  getExam(Id: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.url}/unit/evaluation/${Id}`)
  }

  createSession(body: Session) {
    return this.http.post(`${environment.url}/session/insert`, body)
  }
}
