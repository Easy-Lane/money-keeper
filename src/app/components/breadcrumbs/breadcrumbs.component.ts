import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb-service/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-breadcrumb',
	standalone: true,
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./styles/breadcrumbs.main.scss'],
	imports: [CommonModule, RouterLink],
})
export class BreadcrumbComponent implements OnInit {
	breadcrumbs: Array<{ label: string; url: string }> = [];

	constructor(private breadcrumbService: BreadcrumbService) {}

	ngOnInit(): void {
		this.breadcrumbs = this.breadcrumbService.breadcrumbs;
	}
}
