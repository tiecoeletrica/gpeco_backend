exports.up = (knex) =>
  knex.schema.createTable("obras_turnos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("obra_id").notNullable();
    table.bigInteger("turno_id").notNullable();
    table.text("fase_da_obra").notNullable();
    table.text("retorno_campo").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("obras_turnos");
