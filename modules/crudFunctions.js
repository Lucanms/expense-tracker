import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../data", "data.json");

// create db if not exists
try {
  await fs.access(filePath, fs.constants.F_OK);
} catch (err) {
  console.error("La base de datos no existe. \nCreando base de datos...");
  await fs.writeFile(filePath, JSON.stringify([]), "utf8");
  console.log("Base de datos creada");
}

const rawData = await fs.readFile(filePath);
let data = JSON.parse(rawData);

export async function addExpense({ description, amount }) {
  const maxId = Math.max(0, ...data.map((item) => item.Id));
  const expenseId = maxId + 1;

  const expenseTemplate = {
    Id: expenseId,
    Description: description,
    Amount: amount,
    CreateAt: new Date().toLocaleDateString(),
    UpdateAt: null,
  };

  data.push(expenseTemplate);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`Gasto agregado correctamente. (ID: ${expenseId})`);
}

export async function updExpense({ expenseId, description, amount }) {
  const expense = data.find(({ Id }) => Id === expenseId);

  if (!expense) {
    console.error("No existe ningun elemento con ese id");
    return;
  }

  if (description) {
    expense.Description = description;
  }

  if (amount) {
    expense.Amount = amount;
  }

  expense.UpdateAt = new Date().toLocaleString();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`El elemento ${expenseId} fue actualizado correctamente`);
}

export async function delExpense({ expenseId }) {
  const expense = data.find(({ Id }) => Id === expenseId);

  if (!expense) {
    console.error("No existe ningun elemento con ese id");
    return;
  }

  data = data.filter(({ Id }) => Id !== expenseId);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log("Gasto eliminado correctamente");
}

export function listExpenses() {
  console.log(
    "ID".padEnd(5),
    "Fecha".padEnd(15),
    "Descripción".padEnd(25),
    "Precio".padStart(10),
  );

  console.log("-".repeat(60));

  data.forEach(({ Id, CreateAt, Description, Amount }) => {
    console.log(
      String(Id).padEnd(5),
      CreateAt.padEnd(15),
      Description.slice(0, 25).padEnd(25),
      `$${Amount.toFixed(2)}`.padStart(10),
    );
  });
}

export function summaryExpenses({ month }) {
  let filteredData = data
  
  if (month) {
    filteredData = data.filter(({ CreateAt }) => {
      return CreateAt.slice(3, 5) === month;
    });
    
    if (filteredData.length === 0) {
      console.log("No hay gastos registrados en ese mes");
      return;
    }
  }

  const total = filteredData.reduce((acc, { Amount }) => (acc += Amount), 0);

  console.log(`Gastos totales: $${total.toFixed(2)}`);
}
