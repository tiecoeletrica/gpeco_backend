exports.up = (knex) =>
  knex.schema.createTable("aprs", (table) => {
    table.bigIncrements("id");
    table.string("atividade").notNullable();
    table.bigInteger("obras_turnos_id").references("id").inTable("obras_turnos").notNullable().onDelete("CASCADE");
    table.bigInteger("pergunta_id").references("id").inTable("perguntas").notNullable();
    table.bigInteger("medida_id").references("id").inTable("perguntas").notNullable().comment("medida tomada");
  });

exports.down = (knex) => knex.schema.dropTable("aprs");
