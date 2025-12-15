import { crud } from "./crud.js";
import parsedOpts from "./parseOpts.js";
const [, , action, ...rawOpts] = process.argv;

try {
  const opts = parsedOpts(rawOpts);
  crud(action, opts);
} catch (err) {
  console.error(err.message);
  // process.exit(1);
}
