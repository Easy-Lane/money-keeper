import {ErrorHandler, Injectable} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(private dialog: NzModalService) {
    }

    handleError(error: Error): void {
        console.log(error.stack);

        this.dialog.create({
            nzTitle: 'Error',
            nzContent: 'Try again later!',
            nzClosable: true
        })
    }
}
