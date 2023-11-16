exports.up = (knex) =>
  knex.schema.createTable("colaboradores_turnos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("colaborador_id").notNullable();
    table.bigInteger("turno_id").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("colaboradores_turnos");
