import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {HeaderNavigationComponent} from "../../components/header-navigation/header-navigation.component";
import {AuthorizationButtonsComponent} from "../../components/authorization/authorization-buttons/authorization-buttons.component";
import { IUserToken } from '../../interfaces/IUserInterface';

@Component({
  selector: 'welcome-page',
  standalone: true,
  imports: [RouterOutlet, HeaderNavigationComponent, AuthorizationButtonsComponent, NgIf],
  templateUrl: 'welcome-page.component.html',
  styleUrl: './styles/welcome-page.master.scss'
})
export class WelcomePageComponent {

  constructor(  private router: Router) {}

  private UserService = inject(IUserToken);
  public title: string = 'Money Keeper';
  public description: string = 'free manage tool for your wallet';

  public isAuthorized: boolean = this.UserService.isAuthorized();

  public goCalendar() {
    const item = localStorage.getItem("session");
    if (item !== null)
      this.router.navigate(["/home/calendar"], { queryParams: { "uid" : JSON.parse(item)[0] }});
  } 
}
