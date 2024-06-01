import {Component, OnInit, Inject, DestroyRef, inject, ComponentRef, ViewContainerRef, Injector} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { CustomValidators } from '../../../services/custom-valiodators/CustomValidators';
import { ValidatorsHandlerComponent } from '../../validators-handler/validators-handler.component';
import { ModalService } from '../../../services/modal-services/modal.service';
import { IUserInterface, IUserToken } from '../../../interfaces/IUserInterface';
import { InputControlComponent } from '../../input-control/input-control.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUserInfo } from '../../../interfaces/IUserInfo';
import {RegisterComponent} from "../register/register.component";
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        RouterOutlet,
        ReactiveFormsModule,
        NgIf,
        NgTemplateOutlet,
        ValidatorsHandlerComponent,
        InputControlComponent,
    ],
    templateUrl: 'login.component.html',
    styleUrl: '../styles/authorization.master.scss',
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;
    private _destroyRef: DestroyRef = inject(DestroyRef);
    public registerTemplate!: ViewContainerRef;
    public injector: Injector = inject(Injector);

    constructor(
        @Inject(IUserToken) private User: IUserInterface,
        private formBuilder: FormBuilder,
        private modalService: ModalService
    ) {}

    public closeLoginModal(): void {
        this.modalService.destroyComponent();
    }

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, CustomValidators.emailValidator]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(15),
                ],
            ],
        });
    }

    protected onSubmit(): void {
        const userInfo: IUserInfo = {
            email: this.loginForm.value['email'],
            password: this.loginForm.value['password'],
        };
        this.User.Login(userInfo)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
}
