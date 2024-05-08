import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public getFirstName(): string {
    return 'Обабков';
  }

  public getLastName(): string {
    return 'Обабкович';
  }

  public getExpenses(): number {
    return 1000000;
  }

  public getIncomes(): number {
    return 10000000000;
  }

  public getImage(): string {
    return '/assets/images/userLogo.jpg';
  }
}
