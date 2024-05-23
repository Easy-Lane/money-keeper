import { Component, OnInit, Inject, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomValidators } from "../../../services/custom-valiodators/CustomValidators";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import { ModalService } from "../../../services/modal-services/modal.service";
import { IUserInterface, IUserToken } from '../../../interfaces/IUserInterface';
import { IUserInfo } from '../../../interfaces/IUserInfo';
import { InputControlComponent } from '../../input-control/input-control.component';
import { ValidatorsHandlerComponent } from '../../validators-handler/validators-handler.component';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    ValidatorsHandlerComponent,
    InputControlComponent,
  ],
  templateUrl: 'register.component.html',
  styleUrl: '../styles/authorization.master.scss',
})
export class RegisterComponent implements OnInit {
  public registrationForm!: FormGroup;

  private _destroyRef: DestroyRef = inject(DestroyRef)
  constructor(
    @Inject(IUserToken) private User: IUserInterface,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
  ) { }




  public closeRegisterModal(): void {
    this.modalService.destroyComponent();
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const userInfo: IUserInfo = {
      email: this.registrationForm.value["email"],
      password: this.registrationForm.value["password"],
      username: this.registrationForm.value["username"]
    }
    this.User.Register(userInfo).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
    
  }
}
