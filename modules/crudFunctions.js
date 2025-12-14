import fs from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

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
const data = await JSON.parse(rawData);

export async function addExpense(opts) {
  const [description, expenseDescription, amount] = opts;
  const expenseAmount = Number(opts[3]);

  if (description !== "--description" || amount !== "--amount") {
    throw new Error("Comando invalido");
  }

  if (typeof expenseAmount !== "number" || !Number.isFinite(expenseAmount)) {
    throw new Error("Precio invalido, inserte un numero.");
  }

  const maxId = Math.max(0, ...data.map((item) => item.id));
  const id = maxId + 1;

  const expenseTemplate = {
    Id: id,
    Description: expenseDescription,
    Amount: expenseAmount,
    CreateAt: new Date().toDateString(),
    UpdateAt: null,
  };

  data.push(expenseTemplate);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`Gasto agregado correctamente. (ID: ${id})`);
}

export async function updExpense(opts) {
  console.log(opts);
}

export async function delExpense(opts) {
  const [option, id] = opts;
  const expenseId = Number(id);

  if (opts.length === 0 || opts.length > 2) {
    throw new Error(
      "El comando delete debe tener la opcion --id y el id en cuestion",
    );
  }

  if (option !== "--id") {
    throw new Error("Argumento invalido");
  }

  if (id === undefined) {
    throw new Error("Falta el argumento id");
  }

  if (typeof expenseId !== "number" || !Number.isFinite(expenseId)) {
    throw new Error("El id debe ser un numero");
  }

  const newData = data.filter(({ id }) => id !== expenseId);

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8");
  console.log("Gasto eliminado correctamente");
}

export async function listExpenses(opts) {
  console.log(opts);
}
