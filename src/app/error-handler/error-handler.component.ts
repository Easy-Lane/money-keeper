import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ValidationErrors} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-error-handler',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'error-handler.component.html',
  styleUrl: './styles/error-handler.scss'
})
export class ErrorHandlerComponent {

  public outErrors: string[] = [];
  private previousErrors?: ValidationErrors | Error | null;

  @Input()
  public set errors(error: ValidationErrors | Error | null) {
    if (this.previousErrors && JSON.stringify(this.previousErrors) === JSON.stringify(error)) {
      return;
    }
    this.outErrors = [];
    this.previousErrors = error;
    this.updateErrors(error);
  };

  private updateErrors(error: ValidationErrors | Error | null) {
    if (!error)
      return
    else if (error instanceof Error) {
      this.outErrors.push(error.message);
      return;
    }
    const errorsObject = error as ValidationErrors;

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
