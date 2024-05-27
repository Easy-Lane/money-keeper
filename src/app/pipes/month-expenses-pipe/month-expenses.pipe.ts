import { Pipe, PipeTransform } from '@angular/core';
import { IDayExpenses } from '../../interfaces/calendar/IDayExpenses';

@Pipe({
    name: 'monthExpensesPipe',
    standalone: true,
    pure: false,
})
export class MonthExpensesPipe implements PipeTransform {
    transform(
        monthExpenses: [string, IDayExpenses][]
    ): [string[], number[]] {
        const expensesMap = new Map<string, number>();
        monthExpenses.forEach((dayExpense) => {
            dayExpense[1].expenses?.forEach((expense) => {
                if (expensesMap.has(expense.type)) {
                    expensesMap.set(
                        expense.type,
                        expensesMap.get(expense.type)! + expense.value
                    );
                } else {
                    expensesMap.set(expense.type, expense.value);
                }
            });
        });

        const categories: string[] = [];
        const totals: number[] = [];
    
        expensesMap.forEach((total, category) => {
            categories.push(category);
            totals.push(total);
        });
    
        return [categories, totals];
    }
}
