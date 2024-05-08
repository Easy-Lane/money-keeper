import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface HeaderNavigationList {
  icon: string;
  alt: string;
  text: string;
}

@Component({
  selector: 'header-navigation',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './header-navigation.component.html',
  styleUrl: './styles/header-navigation.master.scss',
  animations: [
    trigger('headerAnimation', [
      state('default', style({ width: '96px' })),
      state('changed', style({ width: '250px' })),
      transition('default => changed', animate('200ms ease-in')),
      transition('changed => default', animate('200ms ease-out')),
    ]),
  ],
})
export class HeaderNavigationComponent {
  logoIcon: string = '/assets/images/logo.svg';

  navigationItems: HeaderNavigationList[] = [
    { icon: '/assets/images/profile.svg', alt: 'profileIcon', text: 'Profile' },
    {
      icon: '/assets/images/calendar.svg',
      alt: 'calendarIcon',
      text: 'Calendar',
    },
    { icon: '/assets/images/graph.svg', alt: 'graphIcon', text: 'Graphs' },
    {
      icon: '/assets/images/pie-chart.svg',
      alt: 'todoIcon',
      text: 'Pie Chart',
    },
  ];

  accountInteraction: HeaderNavigationList[] = [
    { icon: '/assets/images/logOut.svg', alt: 'logOut', text: 'Log Out' },
    {
      icon: '/assets/images/deleteAcc.svg',
      alt: 'deleteAcc',
      text: 'Delete Account',
    },
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

  @Input() isAuthorized!: boolean;
  public isDisabled: boolean = false;

  public isDisabledAnimation: boolean = window.innerWidth <= 900;
  protected readonly window = window;
}
