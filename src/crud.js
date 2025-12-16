import {
  addExpense,
  updExpense,
  delExpense,
  listExpenses,
  summaryExpenses,
} from "../modules/crudFunctions.js";

export function crud(action, opts) {
  try {
    switch (action) {
      case "add":
        addExpense({ description: opts.description, amount: opts.amount });
        break;
      case "update":
        updExpense({
          expenseId: opts.id,
          description: opts.description,
          amount: opts.amount,
        });
        break;
      case "delete":
        delExpense({ expenseId: opts.id });
        break;
      case "list":
        listExpenses();
        break;
      case "summary":
        summaryExpenses();
        break;
      default:
        throw new Error("Accion invalida");
        break;
    }
  } catch (err) {
    console.error(err);
  }
}
