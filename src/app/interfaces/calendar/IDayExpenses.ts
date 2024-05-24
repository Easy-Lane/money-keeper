import { IExpensesInfo } from './IExpenses';

export interface IDayExpenses {
    id?: string;
    day: number;
    month: string;
    year: number;
    expenses?: IExpensesInfo[];
}
