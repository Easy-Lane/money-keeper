import {Component, Inject, Input} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatCardImage} from "@angular/material/card";
import {DIALOG_DATA} from "@angular/cdk/dialog";

@Component({
    selector: 'app-error-modal',
    standalone: true,
    templateUrl: 'error-modal.component.html',
    imports: [
        MatDialogClose,
        MatDialogContent,
        MatCardImage,
        MatDialogTitle
    ],
    styleUrl: 'error-modal.master.scss'
})
export class ErrorModalComponent {
    public message!: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
        this.message = data.message;
    }
}
