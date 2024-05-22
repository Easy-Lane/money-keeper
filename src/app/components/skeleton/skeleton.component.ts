import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-skeleton',
    standalone: true,
    templateUrl: 'skeleton.component.html',
    styleUrl: './styles/skeleton.master.scss'
})
export class SkeletonComponent {
    @Input() type!: string;

}
