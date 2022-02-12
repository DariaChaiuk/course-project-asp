import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformService {
    info$: BehaviorSubject<string> = new BehaviorSubject('');

    getInfo(): Observable<string> {
        return this.info$.asObservable();
      }
    
    setInfo(info: string ): void {
        this.info$.next(info);
    }
}