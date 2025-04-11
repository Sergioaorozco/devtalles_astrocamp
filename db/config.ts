import { defineDb, defineTable, column } from 'astro:db';

const Clients = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    isActive:column.boolean(),
    name:column.text(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Clients,
  }
});
