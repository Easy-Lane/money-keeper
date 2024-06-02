import { Route } from '@angular/router';

export class Breadcrumb {
    public displayName!: string;
    public terminal!: boolean;
    public url!: string;
    public route!: Route | null;
}
