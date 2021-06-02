import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  url: String = environment.url;
  constructor(private http: HttpClient) { }

  getSkill(){
    return this.http.get<any>(`${this.url}/session/practice/1`);
  }

}
