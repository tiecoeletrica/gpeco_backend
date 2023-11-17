exports.up = (knex) =>
  knex.schema.createTable("colaboradores_turnos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("colaborador_id").references("id").inTable("colaboradores").notNullable();
    table.bigInteger("turno_id").references("id").inTable("turnos").notNullable().onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("colaboradores_turnos");
