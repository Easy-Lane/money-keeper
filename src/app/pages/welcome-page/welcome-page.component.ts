import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {HeaderNavigationComponent} from "../../components/header-navigation/header-navigation.component";
import {
    AuthorizationButtonsComponent
} from "../../components/authorization/authorization-buttons/authorization-buttons.component";

@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [RouterOutlet, HeaderNavigationComponent, AuthorizationButtonsComponent, NgIf],
    templateUrl: 'welcome-page.component.html',
    styleUrl: './styles/welcome-page.master.scss'
})
export class WelcomePageComponent {
    public title: string = 'Money Keeper';
    public description: string = 'free manage tool for your wallet';

    public isAuthorized: boolean = false;
}
