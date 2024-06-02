import { Component, ComponentRef, Injector, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { HeaderNavigationComponent } from '../../components/header-navigation/header-navigation.component';
import { AuthorizationButtonsComponent } from '../../components/authorization/authorization-buttons/authorization-buttons.component';
import { IUserToken } from '../../interfaces/IUserInterface';
import {ErrorModalComponent} from "../../components/error-modal/error-modal.component";
import { ModalService } from '../../services/modal-services/modal.service';
import { RegisterComponent } from '../../components/authorization/register/register.component';
import { LoginComponent } from '../../components/authorization/login/login.component';

@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderNavigationComponent,
        AuthorizationButtonsComponent,
        NgIf
    ],
    templateUrl: 'welcome-page.component.html',
    styleUrl: './styles/welcome-page.master.scss',
})
export class WelcomePageComponent {
    constructor(
        private router: Router,
        private modalService: ModalService
    ) {}

    private UserService = inject(IUserToken);
    public title: string = 'Money Keeper';
    public description: string = 'free manage tool for your wallet';

    public isAuthorized: boolean = this.UserService.isAuthorized();

    public injector: Injector = inject(Injector);

    public goCalendar() {
        const item = localStorage.getItem('session');
        if (item !== null)
            this.router.navigate(['/home/calendar'], {
                queryParams: { uid: JSON.parse(item)[0] },
            });
    }

    
    @ViewChild('register', {read: ViewContainerRef, static: true})
    public registerTemplate!: ViewContainerRef;

    @ViewChild('login', {read: ViewContainerRef, static: true})
    public loginTemplate!: ViewContainerRef;

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
