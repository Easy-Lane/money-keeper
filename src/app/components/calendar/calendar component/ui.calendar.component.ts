import { Component, inject, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { CommonModule } from '@angular/common';
import { slideoutControllService } from '../../../services/open-slideout-service/slideout-controll-service';
import { IDayExpenses } from '../../../interfaces/calendar/IDayExpenses';
import { IUserToken } from '../../../interfaces/IUserInterface';
import { where } from '@angular/fire/firestore';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-ui-calendar',
    standalone: true,
    imports: [DayComponent, CommonModule],
    templateUrl: './ui.calendar.component.html',
    styleUrl: './ui.calendar.component.scss',
})
export class UICalendarComponent implements OnInit {
    public UserService = inject(IUserToken);

    todayDate = new Date();
    names: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    currentMonth = this.todayDate.getMonth();
    currentYear: number = this.todayDate.getFullYear();
    lastDays: number[] = [];
    days: number[] = [];
    private id: string = '';
    private monthExpenses: [string, IDayExpenses][] = [];

    constructor(
        private slideoutControll: slideoutControllService,
        private route: ActivatedRoute
    ) {
        //route.params.subscribe(params=>this.id=params["uid"]);
        route.queryParams.subscribe((params) => (this.id = params['uid']));
    }

    ngOnInit() {
        this.UpdateData();
        this.slideoutControll.closeEvent$.subscribe((flag: boolean) => {
            if (flag) this.UpdateData();
        });
    }

    private UpdateData() {
        this.UserService.GetDocsBy(
            this.id,
            where('month', '==', this.months[this.currentMonth]),
            where('year', '==', this.currentYear)
        )
            .pipe(take(1))
            .subscribe((expenses: [string, IDayExpenses][]) => {
                this.monthExpenses = expenses;
            });
        this.days = Array.from(
            {
                length: new Date(
                    this.currentYear,
                    this.currentMonth + 1,
                    0
                ).getDate(),
            },
            (_, i) => i + 1
        );
        this.lastDays = Array.from({
            length: new Date(this.currentYear, this.currentMonth, 0).getDay(),
        });
    }

    public changeMonth(diff: number): void {
        this.currentMonth += diff;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear -= 1;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear += 1;
        }
        this.UpdateData();
    }
    public onDayClick(num: number) {
        let currentData: [string, IDayExpenses] | undefined =
            this.monthExpenses.find((item) => item[1].day == num);
        if (!currentData)
            currentData = [
                '',
                {
                    day: num,
                    month: this.months[this.currentMonth],
                    year: this.currentYear,
                    expenses: [],
                },
            ];
        this.slideoutControll.emitOpenEvent(currentData);
    }
}
