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
    styleUrl: './styles/ui.calendar.master.scss',
})
export class UICalendarComponent implements OnInit {
    public UserService = inject(IUserToken);

    private todayDate = new Date();
    protected names: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    protected months: string[] = [
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
    protected currentMonth: number = this.todayDate.getMonth();
    protected currentYear: number = this.todayDate.getFullYear();
    protected lastDays: number[] = [];
    protected days: number[] = [];
    private id: string = '';
    private monthExpenses: [string, IDayExpenses][] = [];

    constructor(
        private slideoutControll: slideoutControllService,
        private route: ActivatedRoute
    ) {
        route.queryParams.subscribe((params) => (this.id = params['uid']));
    }

    ngOnInit(): void {
        this.UpdateData();
        this.slideoutControll.closeEvent$.subscribe((flag: boolean) => {
            if (flag) this.UpdateData();
        });
    }

    private UpdateData(): void {
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

    protected changeMonth(diff: number): void {
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
    protected onDayClick(num: number): void {
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
