import {Component, OnInit, inject} from '@angular/core';
import {HeaderNavigationComponent} from '../../components/header-navigation/header-navigation.component';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {CustomValidators} from '../../services/custom-valiodators/CustomValidators';
import {AsyncPipe, NgIf} from '@angular/common';
import {SkeletonComponent} from '../../components/skeleton/skeleton.component';
import {InputControlComponent} from '../../components/input-control/input-control.component';
import {IUserInterface, IUserToken} from '../../interfaces/IUserInterface';
import {IUserInfo} from '../../interfaces/IUserInfo';
import {ActivatedRoute} from '@angular/router';
import {catchError, take} from 'rxjs';
import {ValidatorsHandlerComponent} from '../../components/validators-handler/validators-handler.component';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [
        HeaderNavigationComponent,
        ReactiveFormsModule,
        AsyncPipe,
        NgIf,
        SkeletonComponent,
        InputControlComponent,
        ValidatorsHandlerComponent,
    ],
    templateUrl: 'user-profile.component.html',
    styleUrl: './styles/user-profile.master.scss',
})
export class UserProfileComponent implements OnInit {
    public userService: IUserInterface = inject(IUserToken);
    public uid: string = '';
    public user: IUserInfo = this.userService.GetUserInfo();

    protected title: string = 'User Profile';
    protected contentLoaded: boolean = false;

    public userInfoForm!: FormGroup;
    public passwordChangeForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.userInfoForm = this.formBuilder.group({
            name: [this.user.username, Validators.required],
            email: [
                this.user.email,
                [Validators.required, CustomValidators.emailValidator],
            ],
            img: [this.user.photoUrl],
        });
        this.passwordChangeForm = this.formBuilder.group(
            {
                oldPassword: ['', [Validators.required]],
                newPassword: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(15),
                    ],
                ],
                repeatNewPassword: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(15),
                    ],
                ],
            },
            {
                validators: [],
            }
        );
    }

    public ngOnInit(): void {
        this.loadUserData();
    }

    async loadUserData(): Promise<void> {
        try {
            this.route.queryParams.subscribe((params) => {
                this.uid = params['uid'];
            });

            const userInfo: IUserInfo = this.userService.GetUserInfo();
            this.user = userInfo;
            this.userImg = this.user.photoUrl ? this.user.photoUrl : 'assets/images/default-avatar.png';

            this.userInfoForm.patchValue({
                name: this.user.username,
                email: this.user.email,
                img: this.user.photoUrl,
            });

            this.userInfoForm.controls['name'].disable();
            this.userInfoForm.controls['email'].disable();
            this.userInfoForm.controls['img'].disable();

            this.contentLoaded = true;
        } catch (error) {
            console.error('Failed to load user data:', error);
        }
    }

    protected userImg: string = this.user.photoUrl
        ? this.user.photoUrl
        : 'assets/images/default-avatar.png';

    protected toggleEditMode(): void {
        this.userInfoForm.controls['name'].enable();
    }

    protected changePassword(): void {
        this.userService
            .Reauthenticate(this.user)
            .pipe(take(1))
            .subscribe(() =>
                catchError(() => {
                    throw new Error('Ошибка сервиса, пароль не был изменен');
                })
            );
        const oldPassword =
            this.passwordChangeForm.controls['oldPassword'].value;
        const newPassword =
            this.passwordChangeForm.controls['newPassword'].value;
        const repeatNewPassword =
            this.passwordChangeForm.controls['repeatNewPassword'].value;

        if (oldPassword !== this.user.password) {
            return alert('Неверный пароль пользователя!');
        } else if (newPassword !== repeatNewPassword) {
            return alert('Пароли не совпадают!');
        } else {
            this.userService.ChangePassword(newPassword);
            this.user.password = newPassword; //надо изменять его в fb
            this.userService
                .UpdateUserInfo(this.uid, this.user)
                .pipe(take(1))
                .subscribe();
            return alert('Вы успешно сменили пароль!');
        }
    }

    protected onSubmitUserInfo(): void {
        this.userService
            .Reauthenticate(this.user)
            .pipe(take(1))
            .subscribe(() =>
                catchError(() => {
                    throw new Error('Ошибка сервиса, данные не были изменены');
                })
            );
        if (this.user.email != this.userInfoForm.controls['email'].value)
            this.userService.ChangeEmail(this.userInfoForm.controls['email'].value);

        this.user.email = this.userInfoForm.controls['email'].value;
        this.user.username = this.userInfoForm.controls['name'].value;
        this.userService
            .UpdateUserInfo(this.uid, this.user)
            .pipe(take(1))
            .subscribe();

        console.log(this.userInfoForm.value);
        return alert('Вы успешно изменили данные!');
    }
}
