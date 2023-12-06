exports.up = (knex) =>
  knex.schema.createTable("fotos", (table) => {
    table.bigIncrements("id");
    table.string("tipo");
    table.string("obras_turnos_id").references("id").inTable("obras_turnos").onDelete("CASCADE");
    table.bigInteger("turno_id").references("id").inTable("turnos").notNullable().onDelete("CASCADE");
    table.string("link_drive").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("fotos");
