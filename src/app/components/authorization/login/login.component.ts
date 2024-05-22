import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { CustomValidators } from '../../../services/custom-valiodators/CustomValidators';
import { ValidatorsHandlerComponent } from '../../validators-handler/validators-handler.component';
import { ModalService } from '../../../services/modal-services/modal.service';
import { InputControlComponent } from '../../input-control/input-control.component';

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

	constructor(
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
				[Validators.required, Validators.minLength(6), Validators.maxLength(15)],
			],
		});
	}

	onSubmit(): void {
		console.log(this.loginForm.value);
	}
}
