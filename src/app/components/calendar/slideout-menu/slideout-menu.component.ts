import {Component, OnInit, inject, HostListener} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {slideoutControllService} from '../../../services/open-slideout-service/slideout-controll-service';
import {ExpenseCardComponent} from '../expense-card/expense-card.component';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {IDayExpenses} from '../../../interfaces/calendar/IDayExpenses';
import {IUserInterface, IUserToken} from '../../../interfaces/IUserInterface';
import {take} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'app-slide-out',
    standalone: true,
    imports: [ExpenseCardComponent, CommonModule, ReactiveFormsModule],
    templateUrl: './slideout-menu.component.html',
    styleUrls: ['./styles/slideout-menu.master.scss'],
    animations: [
        trigger('slideAnimation', [
            state('default', style({transform: 'translateX(100%)'})),
            state('changed', style({transform: 'translateX(0)'})),
            transition('default => changed', animate('200ms ease-in')),
            transition('changed => default', animate('200ms ease-out')),
        ]),
        trigger('showContent', [
            state('default', style({display: 'none'})),
            state('changed', style({display: 'block'})),
            transition('default => changed', animate('200ms ease-in')),
            transition('changed => default', animate('200ms ease-out')),
        ]),
        trigger('showBackground', [
            state('default', style({opacity: '0', 'z-index': '-1'})),
            state('changed', style({opacity: '0.4', 'z-index': '1000'})),
            transition('default => changed', animate('200ms ease-in')),
            transition('changed => default', animate('200ms ease-out')),
        ]),
    ],
})
export class SlideoutMenuComponent implements OnInit {
    public UserService: IUserInterface = inject(IUserToken);

    public date: IDayExpenses = {day: 0, month: '', year: 0, expenses: []};
    public isChanged: boolean = false;
    public isCreate: boolean = false;
    public wasCreated: boolean = false;
    private uid: string = '';
    private eid: string = '';
    public expenseData!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private clickEmitter: slideoutControllService,
        private route: ActivatedRoute
    ) {
        route.queryParams.subscribe((params) => (this.uid = params['uid']));
        this.expenseData = this.formBuilder.group({
            name: ["", [Validators.required]],
            type: ["", [Validators.required]],
            value: ["", [Validators.required]],
            description: ["", [Validators.required]],
        });
    }

    public ngOnInit() {
        this.clickEmitter.openEvent$.subscribe(
            (data: [string, IDayExpenses]) => {
                this.date = data[1];
                this.eid = data[0];
                this.isChanged = true;
            }
        );
    }

    public createNewExpense(): void {
        console.log(this.expenseData.controls['name'].value);
        this.date.expenses?.push({
            name: this.expenseData.controls['name'].value,
            value: this.expenseData.controls['value'].value,
            desc: this.expenseData.controls['description'].value,
            type: this.expenseData.controls['type'].value,
        });
        if (this.eid == "") {
            this.UserService.CreateDocs(this.uid, this.date)
                .pipe(take(1))
                .subscribe((id) => {
                    this.eid = id;
                });
        } else {
            this.UserService.UpdateDocs(this.uid, this.eid, this.date)
                .pipe(take(1))
                .subscribe();
        }
        this.wasCreated = true;
    }

    public closeMenu(): void {
        this.isChanged = !this.isChanged;
        this.isCreate = false;
        this.clickEmitter.emitCloseEvent(this.wasCreated);
        this.wasCreated = false;
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: { preventDefault: () => void }): void {
        if (this.isChanged) {
            event.preventDefault();
            window.scrollTo(0, 0);
        }
    }
}
