import type { Expense, Budget } from "./storage";
import { loadExpenses, saveExpenses, loadBudget, saveBudget } from "./storage";

// 1. Load saved data when the page opens
let expenses: Expense[] = loadExpenses();
let budget: Budget = loadBudget();

// 2. Grab the HTML elements we need
const totalInput = document.getElementById("total") as HTMLInputElement;
const daysInput = document.getElementById("days") as HTMLInputElement;
const saveBudgetBtn = document.getElementById("save-budget") as HTMLButtonElement;
const remainingText = document.getElementById("remaining") as HTMLElement;
const dailyText = document.getElementById("daily") as HTMLElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const categorySelect = document.getElementById("category") as HTMLSelectElement;
const noteInput = document.getElementById("note") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const filterSelect = document.getElementById("filter") as HTMLSelectElement;
const list = document.getElementById("list") as HTMLUListElement;

// 3. Draw everything on the screen
function render(): void {
  list.innerHTML = "";
  let spent = 0;

  for (const expense of expenses) {
    spent = spent + expense.amount;

    // Skip items that don't match the filter
    if (filterSelect.value !== "all" && expense.category !== filterSelect.value) {
      continue;
    }

    const li = document.createElement("li");
    li.textContent = `${expense.category}: KES ${expense.amount} - ${expense.note}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteExpense(expense.id);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  const remaining = budget.total - spent;
  let daily = 0;
  if (budget.days > 0) {
    daily = remaining / budget.days;
  }

  remainingText.textContent = String(remaining);
  dailyText.textContent = daily.toFixed(0);
}

// 4. Save the budget
function handleSaveBudget(): void {
  const total = Number(totalInput.value);
  const days = Number(daysInput.value);

  if (total <= 0 || days <= 0) {
    alert("Enter a valid amount and number of days");
    return;
  }

  budget = { total: total, days: days };
  saveBudget(budget);
  render();
}

// 5. Add an expense
function addExpense(): void {
  const amount = Number(amountInput.value);

  if (amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const newExpense: Expense = {
    id: Date.now(),
    amount: amount,
    category: categorySelect.value,
    note: noteInput.value,
  };

  expenses.push(newExpense);
  saveExpenses(expenses);

  amountInput.value = "";
  noteInput.value = "";
  render();
}

// 6. Delete an expense
function deleteExpense(id: number): void {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  saveExpenses(expenses);
  render();
}

// 7. Connect buttons to functions
saveBudgetBtn.addEventListener("click", handleSaveBudget);
addBtn.addEventListener("click", addExpense);
filterSelect.addEventListener("change", render);

// 8. Fill the setup boxes with saved values and draw the screen
if (budget.total > 0) {
  totalInput.value = String(budget.total);
  daysInput.value = String(budget.days);
}
render();