import { CounterSchema } from "./counter.schema.js";
import { DataSource } from "typeorm";

export const db = new DataSource({
  type: "sqlite",
  database: `counter.sqlite`,
  synchronize: true,
  entities: [CounterSchema],
  logging: true,
});
