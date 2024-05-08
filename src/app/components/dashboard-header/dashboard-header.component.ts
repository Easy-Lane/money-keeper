import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './styles/dashboard-header.master.scss',
})
export class DashboardHeaderComponent {
  constructor(private userService: UserService) {}
  public username: string = this.userService.getFirstName();
  public lastName: string = this.userService.getLastName();
  public incomes: number = this.userService.getIncomes();
  public expenses: number = this.userService.getExpenses();
  public image: string = this.userService.getImage();

  public isIncomesLong: boolean = this.incomes.toString().length > 10;
  public isExpensesLong: boolean = this.expenses.toString().length > 10;
}
