exports.up = (knex) =>
  knex.schema.createTable("perguntas", (table) => {
    table.bigIncrements('id')
    table.string('pergunta_resposta').notNullable()
    table.string('tipo').notNullable()
    table.string('categoria')
    table.date('data_inicial').notNullable()
    table.date('data_final')
  });

exports.down = (knex) => knex.schema.dropTable("perguntas");