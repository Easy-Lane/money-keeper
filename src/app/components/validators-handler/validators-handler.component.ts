import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ValidationErrors} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-validators-handler',
    standalone: true,
    imports: [RouterOutlet, NgForOf],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'validators-handler.component.html',
    styleUrl: './styles/validators-handler.scss'
})
export class ValidatorsHandlerComponent {

    public outErrors: string[] = [];
    private previousErrors?: ValidationErrors | null;

    @Input()
    public set errors(error: ValidationErrors | null) {
        if (this.previousErrors && JSON.stringify(this.previousErrors) === JSON.stringify(error)) {
            return;
        }
        this.outErrors = [];
        this.previousErrors = error;
        this.updateErrors(error);
    }

    private updateErrors(error: ValidationErrors | null): void {
        if (!error) {
            return
        }

        const errorsObject: ValidationErrors = error as ValidationErrors;

        for (const err in errorsObject) {
            switch (err) {
                case "required":
                    this.outErrors.push("Обязательное поле");
                    break;
                case "minlength":
                    this.outErrors.push(`Минимальная длина пароля - ${errorsObject[err].requiredLength} символов`);
                    break;
                case "maxlength":
                    this.outErrors.push(`Максимальная длина пароля - ${errorsObject[err].requiredLength} символов`);
                    break;
                case 'emailValidator':
                    this.outErrors.push('Некорректный формат email');
                    break;
            }
        }
    }
}
