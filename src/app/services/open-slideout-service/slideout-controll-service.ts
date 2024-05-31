import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDayExpenses } from '../../interfaces/calendar/IDayExpenses';
@Injectable({
    providedIn: 'root',
})
export class slideoutControllService {
    private _openEventSubject = new Subject<[string, IDayExpenses]>();
    openEvent$: Observable<[string, IDayExpenses]> = this._openEventSubject.asObservable();

    private _closeEventSubject = new Subject<boolean>();
    closeEvent$: Observable<boolean> = this._closeEventSubject.asObservable();

    emitOpenEvent(data: [string, IDayExpenses]) {
        this._openEventSubject.next(data);
    }

    emitCloseEvent(data: boolean) {
        this._closeEventSubject.next(data);
    }

}
