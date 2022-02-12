import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanVsStatus } from '../models/plan-vs-status';
import { Plan } from '../models/plan.inteface';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  apiUrl: string = `https://localhost:5001/api/Plans`;
  constructor(private httpClient: HttpClient) { }

  create(plan: Plan): Observable<void> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.post<any>(this.apiUrl, plan, {headers: headers});
  }
  update(plan: Plan): Observable<void> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');

    return this.httpClient.put<any>(`${this.apiUrl}/${plan.id}`, plan, {headers: headers});
  }

  getAllForUser(id: number): Observable<PlanVsStatus[]>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    return this.httpClient.get<PlanVsStatus[]>(this.apiUrl + `/UserPlans/${id}`, {headers: headers});
  }

  getById(id: number): Observable<Plan> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.get<Plan>(this.apiUrl + `/${id}`, {headers: headers});
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.delete<any>(this.apiUrl + `/${id}`, {headers: headers});
  }
}
