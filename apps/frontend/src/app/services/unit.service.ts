import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root',
})
export class UnitService {

  constructor(private http: HttpClient) { }
  
  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${environment.url}/unit/all/user`);
  }
}
