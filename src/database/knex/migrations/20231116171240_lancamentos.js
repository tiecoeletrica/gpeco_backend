exports.up = (knex) =>
  knex.schema.createTable("lancamentos", (table) => {
    table.bigIncrements('id')
    table.bigInteger('obras_turnos_id').notNullable()
    table.bigInteger('servico_id').notNullable()
    table.float('quantidade').notNullable()
  });

exports.down = (knex) => knex.schema.dropTable("lancamentos");