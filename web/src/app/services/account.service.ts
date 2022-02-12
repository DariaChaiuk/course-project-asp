import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.intreface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl: string = `https://localhost:5001/api/Account`;
  token$: BehaviorSubject<string> = new BehaviorSubject('');
  id$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private httpClient: HttpClient) { 
    const token = localStorage.getItem('access_token') || '';
    this.token$.next(token);
  }

  login(data: any){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*');
    return this.httpClient.post<any>(this.apiUrl + "/Login", { ...data }, {headers: headers});
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  }

  getTokenNotification(): Observable<string> {
    return this.token$.asObservable();
  }

  setToken(token: string ): void {
    localStorage.setItem('access_token', token);
    this.token$.next(token);
  }

  setUser(id: string): void {
    localStorage.setItem('user_id', id);
    this.id$.next(id);
  }

  registration(user: User){
    console.log(user)
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*');
    return this.httpClient.post<any>(this.apiUrl + "/Registration", user, {headers: headers});
  }
}
