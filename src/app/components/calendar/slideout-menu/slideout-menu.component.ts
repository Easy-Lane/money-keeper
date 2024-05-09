import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'slide-out',
  standalone: true,
  imports: [],
  templateUrl: './slideout-menu.component.html',
  styleUrls: ['./slideout-menu.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state('default', style({ width: '0px'})),
      state('changed', style({ width: '700px' })),
      transition('default => changed', animate('200ms ease-in')),
      transition('changed => default', animate('200ms ease-out'))
    ]),
    trigger('showContent', [
      state('default', style({ display: 'none' })),
      state('changed', style({ display: 'block' })),
      transition('default => changed', animate('200ms ease-in')),
      transition('changed => default', animate('200ms ease-out'))
    ])]
})
export class SlideoutMenuComponent {
  public isChanged: boolean = false;

}
