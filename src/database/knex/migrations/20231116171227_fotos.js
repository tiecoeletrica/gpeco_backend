exports.up = (knex) =>
  knex.schema.createTable("fotos", (table) => {
    table.bigIncrements("id");
    table.string("tipo");
    table.bigInteger("tipo_id").comment("medida tomada, nao esta referenciada pq depende do tipo");
    table.bigInteger("turno_id").references("id").inTable("turnos").notNullable().onDelete("CASCADE");
    table.string("link_drive").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("fotos");
