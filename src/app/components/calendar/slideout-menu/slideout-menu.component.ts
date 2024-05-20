import { Component, OnInit, inject } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { clickEmitterService } from '../../../services/open-slideout-service/clickEmitterService';
import { ExpenseCardComponent } from '../expense-card/expense-card.component';
import { IExpensesInfo } from '../../../interfaces/calendar/IExpenses';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IDayExpenses } from '../../../interfaces/calendar/IDayExpenses';
import { IUserToken } from '../../../interfaces/IUserInterface';
@Component({
  selector: 'slide-out',
  standalone: true,
  imports: [ExpenseCardComponent, CommonModule],
  templateUrl: './slideout-menu.component.html',
  styleUrls: ['./slideout-menu.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state('default', style({ right: '-700px'})),
      state('changed', style({ right: '0' })),
      transition('default => changed', animate('200ms ease-in')),
      transition('changed => default', animate('200ms ease-out'))
    ]),
    trigger('showContent', [
      state('default', style({ display: 'none' })),
      state('changed', style({ display: 'block' })),
      transition('default => changed', animate('200ms ease-in')),
      transition('changed => default', animate('200ms ease-out'))
    ]),
    trigger('showBackground', [
      state('default', style({ opacity: '0', "z-index" :'-1'})),
      state('changed', style({ opacity: '0.4',"z-index" :'1000'  })),
      transition('default => changed', animate('200ms ease-in')),
      transition('changed => default', animate('200ms ease-out'))
    ])],
    
})
export class SlideoutMenuComponent implements OnInit {

  public UserService = inject(IUserToken);

  public date?: string;
  public info?: IExpensesInfo[];
  public isChanged: boolean = false;
  public isCreate: boolean = false;
  private uid: string = "";
  private eid: string = "";
  constructor(
    private clickEmitter: clickEmitterService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params=>this.uid=params["id"]);
  }

  ngOnInit() {
   
    this.clickEmitter.clickEvent$.subscribe((data: [string, IDayExpenses]) => {
      this.date = data[1].day +" "+ data[1].month +" "+ data[1].year;
      this.info = data[1].expenses;
      this.eid = data[0];
      this.isChanged = true;
    });

  }
}
