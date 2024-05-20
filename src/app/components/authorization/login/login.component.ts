import {Component, OnInit, Inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {CustomValidators} from "../../../services/custom-valiodators/CustomValidators";
import {ErrorHandlerComponent} from "../../../error-handler/error-handler.component";
import {ModalService} from "../../../services/modal-services/modal.service";
import { IUserInterface, IUserToken } from '../../../interfaces/IUserInterface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgIf, NgTemplateOutlet, ErrorHandlerComponent],
  templateUrl: 'login.component.html',
  styleUrl: '../styles/authorization.master.scss'
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;

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
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  onSubmit():void {
    this.User.Login({
      email: this.loginForm.value["email"],
      password: this.loginForm.value["password"]
    }).subscribe();
  }
}