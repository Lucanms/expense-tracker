import {
  addExpense,
  updExpense,
  delExpense,
  listExpenses,
} from "../modules/crudFunctions.js";

export function crud(action, opts) {
  try {
    switch (action) {
      case "add":
        addExpense(opts);
        break;
      case "update":
        updExpense(opts);
        break;
      case "delete":
        delExpense(opts);
        break;
      case "list":
        listExpenses(opts);
        break;
      default:
        throw new Error("Accion invalida");
        break;
    }
  } catch (err) {
    console.error(err);
  }
}
