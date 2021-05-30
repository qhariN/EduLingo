import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) {}

  getUnits(): Observable<any> {
    return this.http.get('https://edulingo-staging.herokuapp.com/api/unit/all/user');
  }
}
