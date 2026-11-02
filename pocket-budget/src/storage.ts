// The shape of one expense
export interface Expense {
  id: number;
  amount: number;
  category: string;
  note: string;
}

// The shape of the user's budget
export interface Budget {
  total: number;
  days: number;
}

export function loadExpenses(): Expense[] {
  const data = localStorage.getItem("expenses");
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

export function loadBudget(): Budget {
  const data = localStorage.getItem("budget");
  if (data === null) {
    return { total: 0, days: 1 };
  }
  return JSON.parse(data);
}

export function saveBudget(budget: Budget): void {
  localStorage.setItem("budget", JSON.stringify(budget));
}