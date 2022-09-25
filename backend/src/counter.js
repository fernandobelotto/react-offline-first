import { CounterSchema } from "./counter.schema.js";
import { db } from './typeorm.js'

export async function getLastRecord(_req, res,) {
  const records = await db.getRepository(CounterSchema).find()
  res.json(records[records.length - 1])
}

export async function createRecord(req, res) {
  const counter = req.body.counter;
  const result = await db.getRepository(CounterSchema).save({ counter })
  res.status(201).json(result);
}
