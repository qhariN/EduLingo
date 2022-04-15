import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Progress } from '../models/progress';
import { Option, Question, Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getSkill(idsession: number): Observable<Skill> {
    return this.http.get<Skill>(`${environment.url}/session/practice/${idsession}`)
  }

  getSkillNoRand(idsession: number): Observable<Skill> {
    return this.http.get<Skill>(`${environment.url}/session/practice/norand/${idsession}`)
  }

  deactivateSession(idsession: number) {
    return this.http.patch(`${environment.url}/session/deactivate/${idsession}`, null)
  }

  createQuestion(question: Question) {
    return this.http.post(`${environment.url}/session/question/create`, question)
  }

  updateQuestion(question: Question) {
    return this.http.post(`${environment.url}/session/question/update`, question)
  }

  deactivateQuestion(idquestion: number) {
    return this.http.patch(`${environment.url}/session/question/deactivate/${idquestion}`, null)
  }

  postProgressSkill(item) {
    return this.http.post(`${environment.url}/progress/insert`, { user: { id: +localStorage.getItem('user') }, progress: item })
  }

  getOptions(): Observable<Option[]> {
    return this.http.get<Option[]>(`${environment.url}/session/options`)
  }

  getProgress(): Observable<Progress>{
    return this.http.post<Progress>(`${environment.url}/progress`, { id: +localStorage.getItem('user') })
  }
}
