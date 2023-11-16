exports.up = (knex) =>
  knex.schema.createTable("fotos", (table) => {
    table.bigIncrements("id");
    table.string("tipo");
    table.bigInteger("tipo_id");
    table.bigInteger("turno_id").notNullable();
    table.string("link_drive").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("fotos");
