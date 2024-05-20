import {Component, forwardRef, Input, OnInit, Optional, Self} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ValidatorFn, Validators} from "@angular/forms";
import {CustomValidators} from "../../services/custom-valiodators/CustomValidators";
import {ValidatorsHandlerComponent} from "../validators-handler/validators-handler.component";
import {NgIf} from "@angular/common";

export interface InputForm {
  type: 'text' | 'email' | 'password',
  placeholder: string
}

@Component({
  selector: 'app-input-control',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputControlComponent),
    multi: true
  }],
  templateUrl: 'input-control.component.html',
  imports: [
    ValidatorsHandlerComponent,
    NgIf
  ],
  styleUrl: './styles/input-control.master.scss'
})
export class InputControlComponent implements ControlValueAccessor, OnInit {
  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};
  public value!: string;

  @Input() input!: InputForm;

  // constructor(@Optional() @Self() public ngControl: NgControl) {
  //   if (this.ngControl != null) {
  //     this.ngControl.valueAccessor = this;
  //   }
  // }

  public validatorsList!: ValidatorFn[] ;

  ngOnInit(): void {
    if (this.input.type === 'text') {
      this.validatorsList = [ Validators.required ];
    } else if (this.input.type === 'email') {
      this.validatorsList = [ Validators.required, CustomValidators.emailValidator ];
    } else if (this.input.type === 'password') {
      this.validatorsList = [ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]
    }
    // this.ngControl.control?.setValidators(this.validatorsList);
    // this.ngControl.control?.updateValueAndValidity();
    console.log('123')
  }

  writeValue(value: string): void {
    this.value = value;
    console.log(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    console.log('123');
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
    console.log('123');
  }
}
