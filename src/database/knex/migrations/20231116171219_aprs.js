exports.up = (knex) =>
  knex.schema.createTable("aprs", (table) => {
    table.bigIncrements("id");
    table.string("atividade").notNullable();
    table.bigInteger("obras_turnos_id").references("id").inTable("obras_turnos").notNullable().onDelete("CASCADE");
    table.string("pergunta_ids").notNullable();
    table.string("medida_ids").notNullable().comment("medida tomada");
  });

exports.down = (knex) => knex.schema.dropTable("aprs");
