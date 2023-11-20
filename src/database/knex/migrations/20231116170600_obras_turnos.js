exports.up = (knex) =>
  knex.schema.createTable("obras_turnos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("obra_id").references("id").inTable("obras").notNullable();
    table.bigInteger("turno_id").references("id").inTable("turnos").notNullable().onDelete("CASCADE");
    table.string("fase_da_obra").notNullable();
    table.string("retorno_campo").notNullable();
    table.boolean("fora_programacao").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("obras_turnos");
