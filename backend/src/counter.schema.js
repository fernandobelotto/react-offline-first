import typeorm from "typeorm";
class CounterModel {
  constructor(id, counter) {
    this.id = id;
    this.counter = counter;
  }
}

const EntitySchema = typeorm.EntitySchema;

export const CounterSchema = new EntitySchema({
  name: "CounterModel",
  target: CounterModel,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    counter: {
      type: "integer",
    },
  },
});
