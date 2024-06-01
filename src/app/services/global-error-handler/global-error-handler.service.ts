import {ErrorHandler, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ErrorModalComponent} from "../../components/error-modal/error-modal.component";


@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(private dialog: MatDialog ) {
    }

    handleError(error: Error): void {
        this.dialog.open(ErrorModalComponent, {
            width: '250px',
            data: { message: error.message }
        })
    }
}
