exports.up = (knex) =>
  knex.schema.createTable("obras_turnos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("obra_id").references("id").inTable("obras").notNullable();
    table.bigInteger("turno_id").references("id").inTable("turnos").notNullable();
    table.text("fase_da_obra").notNullable();
    table.text("retorno_campo").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("obras_turnos");
