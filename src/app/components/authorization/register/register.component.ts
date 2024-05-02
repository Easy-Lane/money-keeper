import {Component, OnInit, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomValidators} from "../../../services/custom-valiodators/CustomValidators";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {ErrorHandlerComponent} from "../../../error-handler/error-handler.component";
import {Subject} from "rxjs";
import {ModalService} from "../../../services/modal-services/modal.service";
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgTemplateOutlet, NgIf, ErrorHandlerComponent],
  templateUrl: 'register.component.html',
  styleUrl: '../styles/authorization.master.scss'
})
export class RegisterComponent implements OnInit{

  public registrationForm!: FormGroup;
  public auth = inject(Auth)
  constructor(private formBuilder: FormBuilder,
              private modalService: ModalService) {}

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
    createUserWithEmailAndPassword(this.auth, this.registrationForm.value["email"], this.registrationForm.value["password"])
      .then((user) => {
        if (this.auth.currentUser)
          updateProfile(this.auth.currentUser, { displayName: this.registrationForm.value["username"],});

        console.log(user)
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      });
  }
}