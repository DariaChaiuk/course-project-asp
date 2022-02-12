import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.intreface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = `https://localhost:5001/api/Users`;
  constructor(private httpClient: HttpClient) { }

  create(user: User): Observable<void> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.post<any>(this.apiUrl, user, {headers: headers});
  }
  update(entity: any): Observable<void> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.put<any>(`${this.apiUrl}/${entity.id}`, entity, {headers: headers});
  }

  getById(id: number): Observable<User> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.get<User>(this.apiUrl + `/${id}`, {headers: headers});
  }

  resetPassword(id: number, password: string, newPassword: string): Observable<void> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.put<any>(this.apiUrl + `/UserPasswordReset/${id}`,{password: password, newPassword: newPassword}, {headers: headers});
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('Accept', '*/*');
    return this.httpClient.delete<any>(this.apiUrl + `/${id}`, {headers: headers});
  }
}
