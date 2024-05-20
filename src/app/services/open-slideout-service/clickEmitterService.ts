import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDayExpenses } from '../../interfaces/calendar/IDayExpenses';
@Injectable({
  providedIn: 'root'
})
export class clickEmitterService {
  private _clickEventSubject = new Subject<any>();
  clickEvent$ = this._clickEventSubject.asObservable();

  emitClickEvent(data: [string, IDayExpenses]) {
    this._clickEventSubject.next(data);
  }
}
