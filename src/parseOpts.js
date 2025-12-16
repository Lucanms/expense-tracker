export default function parsedOpts(opts) {
  const result = {};

  const validFlags = ["--description", "--amount", "--id", "--month"];

  for (let i = 0; i < opts.length; i += 2) {
    const key = opts[i];
    let value = opts[i + 1];

    if (!key || !value) {
      throw new Error("Argumentos incompletos");
    }

    if (!validFlags.includes(key)) {
      throw new Error("Flag invalido");
    }

    if (key === "--amount" || key === "--id" || key === "--month") {
      value = Number(value);
      if (!Number.isFinite(value)) {
        throw new Error(`El argumento de ${key} debe ser un numero`);
      }
    }

    if (key === "--description") {
      if (value.length > 25) {
        throw new Error("El maximo de caracteres permitido es de 25");
      }

      if (!value || /^\d+$/.test(value)) {
        throw new Error("La descripción no puede ser solo números");
      }
    }

    if (key === "--month") {
      const month = Number(value)
      

      if (month > 12 || month < 1 || !Number.isInteger(month)) {
        throw new Error("Mes invalido");
      }
      
      value = month < 10 ? `0${month}` : String(month);
    }

    result[key.slice(2)] = value;
  }
  return result;
}
