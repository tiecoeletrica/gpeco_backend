exports.up = (knex) =>
  knex.schema.createTable("obras", (table) => {
    table.bigIncrements("id");
    table.string("projeto").notNullable();
    table.string("descricao").notNullable();
    table.string("status").notNullable();
    table.string("carteira").notNullable();
    table.string("cidade").notNullable();
    table.string("utd").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("obras");
