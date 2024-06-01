import {
    Component,
    EventEmitter,
    Output,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
@Component({
    selector: 'app-authorization-buttons',
    standalone: true,
    imports: [
        RouterOutlet,
        NgIf,
        RegisterComponent,
        LoginComponent,
        NgTemplateOutlet,
    ],
    templateUrl: 'authorization-buttons.component.html',
    styleUrl: './styles/authorization-buttons.master.scss',
})
export class AuthorizationButtonsComponent {
    protected registerButton: string = 'sign up';
    protected logButton: string = 'log in';

    @Output() loginEvent = new EventEmitter<void>();
    @Output() signupEvent = new EventEmitter<void>();


}
