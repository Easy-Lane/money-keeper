import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatCardImage} from "@angular/material/card";

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
