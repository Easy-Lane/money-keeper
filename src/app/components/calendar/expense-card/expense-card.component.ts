import { Component, Input } from '@angular/core';
import { IExpensesInfo } from '../../../interfaces/calendar/IExpenses';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'expense-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss'
})
export class ExpenseCardComponent {
 @Input() public info?:IExpensesInfo;
}
