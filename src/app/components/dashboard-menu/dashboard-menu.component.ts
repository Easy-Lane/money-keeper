import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'dashboard-menu',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './styles/dashboard-menu.master.scss',
})
export class DashboardMenuComponent {
  constructor(private userService: UserService) {}
  public userImage: string = this.userService.getImage();
  public currency: string = '/assets/images/rub.svg';

  public changeCurrency(): void {
    switch (this.currency) {
      case '/assets/images/currency.svg': {
        this.currency = '/assets/images/rub.svg';
        break;
      }
      default: {
        this.currency = '/assets/images/currency.svg';
        break;
      }
    }
  }
}
