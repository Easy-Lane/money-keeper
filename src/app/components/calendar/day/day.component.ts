import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-day',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './day.component.html',
	styleUrl: './day.component.scss',
})
export class DayComponent {
	@Input() day?: number;
	@Input() img?: string;
	@Input() value?: number;
}
