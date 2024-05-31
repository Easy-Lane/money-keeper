import { Component, OnInit } from '@angular/core';

import { BreadcrumbService } from '../../services/breadcrumb-service/breadcrumb.service';
import { Breadcrumb } from './breadcrumb';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './breadcrumbs.component.html',
    styleUrl: './styles/breadcrumbs.main.scss',
})
export class BreadcrumbComponent {
    protected breadcrumbs!: Breadcrumb[];

    constructor(private breadcrumbService: BreadcrumbService) {
        breadcrumbService.breadcrumbChanged.subscribe(
            (crumbs: Breadcrumb[]) => {
                this.onBreadcrumbChange(crumbs);
            }
        );
    }

    private onBreadcrumbChange(crumbs: Breadcrumb[]) {
        this.breadcrumbs = crumbs;
    }
}
