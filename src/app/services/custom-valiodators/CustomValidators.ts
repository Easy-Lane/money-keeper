import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {
   public static emailValidator(control: AbstractControl): ValidationErrors | null {
     const email = control.value;
     const validEmailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

     if (!validEmailPattern.test(email)) {
       return { emailValidator: true };
     }

     return null;
   }
}
