import {Component, OnInit} from "@angular/core";
import {HeaderNavigationComponent} from "../../components/header-navigation/header-navigation.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomValidators} from "../../services/custom-valiodators/CustomValidators";
import {AsyncPipe, NgIf} from "@angular/common";
import {SkeletonComponent} from "../../components/skeleton/skeleton.component";
import {InputControlComponent} from "../../components/input-control/input-control.component";

export interface User {
    name: string,
    email: string,
    password: string,
    img: string
}

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [
        HeaderNavigationComponent,
        ReactiveFormsModule,
        AsyncPipe,
        NgIf,
        SkeletonComponent,
        InputControlComponent
    ],
    templateUrl: 'user-profile.component.html',
    styleUrl: './styles/user-profile.master.scss'
})
export class UserProfileComponent implements OnInit {
    //userа надо получать с fb
    public user: User = {
        name: 'Lol-Govno',
        email: 'lol-govno@mail.ru',
        password: 'luchsheVdotu',
        img: ''
    };

    public title: string = 'User Profile';
    public contentLoaded: boolean = false;

    public userInfoForm!: FormGroup;
    public passwordChangeForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.userInfoForm = this.formBuilder.group({
            name: [this.user.name, Validators.required],
            email: [this.user.email, [Validators.required, CustomValidators.emailValidator]],
            img: [this.user.img]
        })

        this.passwordChangeForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            repeatNewPassword: ['', [Validators.required]]
        }, {
            validators: []
        });
    }

    public ngOnInit(): void {
        setTimeout((): void => {
            this.contentLoaded = true;
        }, 2000);

        this.userInfoForm.patchValue({
            name: this.user.name,
            email: this.user.email,
            img: this.user.img
        });

        this.userInfoForm.controls['name'].disable();
        this.userInfoForm.controls['email'].disable();
        this.userInfoForm.controls['img'].disable();
    }

    public userImg: string = this.user.img ? this.user.img : 'assets/images/default-avatar.png';

    public toggleEditMode(): void {
        this.userInfoForm.controls['name'].enable();
        this.userInfoForm.controls['email'].enable();
    }

    public changePassword(): void {
        const oldPassword = this.passwordChangeForm.controls['oldPassword'].value;
        const newPassword = this.passwordChangeForm.controls['newPassword'].value;
        const repeatNewPassword = this.passwordChangeForm.controls['repeatNewPassword'].value;

        if (oldPassword !== this.user.password) {
            return alert('Неверный пароль пользователя!');
        } else if (newPassword !== repeatNewPassword) {
            return alert('Пароли не совпадают!');
        } else {
            this.user.password = newPassword;//надо изменять его в fb
            return alert('Вы успешно сменили пароль!');
        }
    }

    public onSubmitUserInfo(): void {

        console.log(this.userInfoForm.value);
        return alert('Вы успешно изменили данные!');
    }
}
