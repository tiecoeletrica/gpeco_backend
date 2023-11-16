exports.up = (knex) =>
  knex.schema.createTable("aprs", (table) => {
    table.bigIncrements("id");
    table.string("atividade").notNullable();
    table.bigInteger("obras_turnos_id").notNullable();
    table.bigInteger("pergunta_id").notNullable();
    table.bigInteger("medida_id").notNullable().comment("medida tomada");
  });

exports.down = (knex) => knex.schema.dropTable("aprs");
