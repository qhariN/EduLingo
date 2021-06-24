import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Skill } from '../models/skill';


@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getSkill(idsession: number): Observable<Skill> {
    return this.http.get<Skill>(`${environment.url}/session/practice/${idsession}`)
  }
  postProgressSkill(item){
    return this.http.post(`${environment.url}/progress/insert`,item)
  }
}
