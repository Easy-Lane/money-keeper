import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ErrorModalComponent} from "../../components/error-modal/error-modal.component";


@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(
        private dialog: MatDialog,
        private ngZone: NgZone
     ) {
    }

    handleError(error: Error): void {
        this.ngZone.run((): void => {
            this.dialog.open(ErrorModalComponent, {
                width: '250px',
                data: {message: error.message}
            })
        });
    }
}
