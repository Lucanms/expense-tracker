import { crud } from "./crud.js";
const [,, action, ...opts] = process.argv

crud(action, opts)