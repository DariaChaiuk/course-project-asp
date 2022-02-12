import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiUrl: string = `https://localhost:5001/api/Status`;
  constructor(private httpClient: HttpClient) { }

  public getStatuses(userId: number): Observable<Status[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    
    return this.httpClient.get<Status[]>(`${this.apiUrl}/UserStatuses/${userId}`, { headers });
  }

  public addStatus(userId: number, status: Status): Observable<void> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))

    return this.httpClient.post<void>(`${this.apiUrl}/${userId}`, status , { headers })
  }
  
  delete(id: number): Observable<void> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.delete<void>(this.apiUrl + `/${id}`, {headers: headers});
  }

  update(status: Status): Observable<void> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');

    return this.httpClient.put<any>(`${this.apiUrl}/${status.id}`, status, {headers: headers});
  }
}
