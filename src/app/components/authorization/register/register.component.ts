import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CustomValidators } from '../../../services/custom-valiodators/CustomValidators';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ValidatorsHandlerComponent } from '../../validators-handler/validators-handler.component';
import { ModalService } from '../../../services/modal-services/modal.service';
import { InputControlComponent } from '../../input-control/input-control.component';

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

	constructor(
		private formBuilder: FormBuilder,
		private modalService: ModalService
	) {}

	public closeRegisterModal(): void {
		this.modalService.destroyComponent();
	}

	ngOnInit(): void {
		this.registrationForm = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', [Validators.required, CustomValidators.emailValidator]],
			password: [
				'',
				[Validators.required, Validators.minLength(6), Validators.maxLength(15)],
			],
		});
	}

	onSubmit(): void {
		if (this.registrationForm.invalid) {
			return;
		}
		console.log(this.registrationForm.value);
	}
}
