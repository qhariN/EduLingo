import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Skill } from '../models/skill';


@Injectable({
  providedIn: 'root'
})
export class SkillService {

  url: String = environment.url

  constructor(private http: HttpClient) { }

  getSkill(idsession: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.url}/session/practice/${idsession}`)
  }
}
