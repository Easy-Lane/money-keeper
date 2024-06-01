import {
    Component,
    ComponentRef,
    inject,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {Injector} from '@angular/core';
import {ModalService} from '../../../services/modal-services/modal.service';

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

    public injector: Injector = inject(Injector);

    @ViewChild('register', {read: ViewContainerRef, static: true})
    public registerTemplate!: ViewContainerRef;

    @ViewChild('login', {read: ViewContainerRef, static: true})
    public loginTemplate!: ViewContainerRef;

    constructor(private modalService: ModalService) {
    }

    public openRegisterModal(): void {
        const registerComponent: ComponentRef<RegisterComponent> =
            this.registerTemplate.createComponent(RegisterComponent, {
                injector: this.injector,
            });
        this.modalService.setComponentRef(registerComponent);
    }

    public openLoginModal(): void {
        const loginComponent: ComponentRef<LoginComponent> =
            this.loginTemplate.createComponent(LoginComponent, {
                injector: this.injector,
            });
        this.modalService.setComponentRef(loginComponent);
    }
}
