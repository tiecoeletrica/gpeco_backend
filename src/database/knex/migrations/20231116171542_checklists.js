exports.up = (knex) =>
  knex.schema.createTable("checklists", (table) => {
    table.bigIncrements('id')
    table.string('tipo_checklist').notNullable().comment("smc, veicular ou epi")
    table.bigInteger('pergunta_id').notNullable()
    table.bigInteger('colaborador_id')
    table.bigInteger('turno_id').references("id").inTable("turnos").notNullable()
    table.string('codigo_camera').comment("para o smc")
    table.string('defeito').comment("para o smc")
  });

exports.down = (knex) => knex.schema.dropTable("checklists");