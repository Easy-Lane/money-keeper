import {
	Directive,
	Input,
	OnChanges,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';

@Directive({
	selector: '[forChart]',
	standalone: true,
})
export class ForChartsDirective implements OnChanges {
	@Input() forChartOf!: Array<string>;

	constructor(
		private container: ViewContainerRef,
		private template: TemplateRef<any>
	) {}

	ngOnChanges() {
		this.container.clear();
		let result: Array<string> = new Array<string>();
		if (this.forChartOf.length > 5) {
			for (let i = 0; i < 4; i++) {
				result.push(this.forChartOf[i]);
			}
			result.push('Разное');
			this.forChartOf = result;
		}
		if (this.forChartOf.length == 0) {
			this.forChartOf.push('Вы ещё не совершали трат');
		}
		for (const input of this.forChartOf) {
			this.container.createEmbeddedView(this.template, {
				$implicit: input,
				index: this.forChartOf.indexOf(input),
			});
		}
	}
}
