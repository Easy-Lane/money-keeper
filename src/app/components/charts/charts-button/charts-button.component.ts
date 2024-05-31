import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'charts-button',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './charts-button.component.html',
    styleUrl: './styles/charts-button.master.scss',
})
export class ChartsButtonComponent {
    @Input() title!: string;
    public label: string = 'Изучить';

    constructor(private router: Router) {}

    public async goToChart() {
        await this.router.navigate(['/home/dashboard/' + this.title]);
    }
}
