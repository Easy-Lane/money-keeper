import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-charts-button',
    standalone: true,
    imports: [RouterOutlet, CommonModule, RouterLink],
    templateUrl: './charts-button.component.html',
    styleUrl: './styles/charts-button.master.scss',
})
export class ChartsButtonComponent {
    @Input() title!: string;
    private ls: string = localStorage.getItem('session')!;
    protected query = { uid: JSON.parse(this.ls)[0] };
    constructor(private router: Router) {}

    public async goToChart() {
        await this.router.navigate(['/home/dashboard/' + this.title]);
    }
}
