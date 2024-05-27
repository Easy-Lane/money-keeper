import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'expensesTypePipe',
	standalone: true,
	pure: false,
})
export class ExpensesTypePipe implements PipeTransform {
	public types: Map<string, string> = new Map([
        ["Gym", "assets/images/Gym.svg"],
        ["Transport", "assets/images/Transport.svg"],
        ["Grocery", "assets/images/Grocery.svg"]
      ]);

	transform(type: string) {
        console.log(this.types.get(type));
		return this.types.get(type);
	}
}
