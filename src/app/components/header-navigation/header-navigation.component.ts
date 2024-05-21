import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface HeaderNavigationList {
    icon: string,
    alt: string,
    text: string,
    path: string
}

@Component({
    selector: 'app-header-navigation',
    standalone: true,
    imports: [RouterOutlet, CommonModule, RouterLink],
    templateUrl: './header-navigation.component.html',
    styleUrl: './styles/header-navigation.master.scss',
    animations: [
        trigger('headerAnimation', [
            state('default', style({width: '96px'})),
            state('changed', style({width: '250px'})),
            transition('default => changed', animate('200ms ease-in')),
            transition('changed => default', animate('200ms ease-out'))
        ])
    ]
})
export class HeaderNavigationComponent {
    public logoIcon: string = "/assets/images/logo.svg";

    public navigationItems: HeaderNavigationList[] = [
        {icon: "/assets/images/profile.svg", alt: 'profileIcon', text: 'Profile', path: 'user-profile'},
        {icon: "/assets/images/calendar.svg", alt: 'calendarIcon', text: 'Calendar', path: ''},
        {icon: "/assets/images/graph.svg", alt: 'graphIcon', text: 'DashBoard', path: ''}
    ];

    public accountInteraction: HeaderNavigationList[] = [
        {icon: "/assets/images/logOut.svg", alt: 'logOut', text: 'Log Out', path: ''},
        {icon: "/assets/images/deleteAcc.svg", alt: 'deleteAcc', text: 'Delete Account', path: ''}
    ];

    public isChanged: boolean = window.innerWidth <= 450;

    public openHeader(): void {
        if (!this.isDisabledAnimation) {
            this.isChanged = true;
        }
    }

    public closeHeader(): void {
        if (!this.isDisabledAnimation) {
            this.isChanged = false;
        }
    }

    public isDisabledAnimation: boolean = window.innerWidth <= 900;
    protected readonly window = window;
}
