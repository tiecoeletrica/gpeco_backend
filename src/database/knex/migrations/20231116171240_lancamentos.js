exports.up = (knex) =>
  knex.schema.createTable("lancamentos", (table) => {
    table.bigIncrements('id')
    table.bigInteger('obras_turnos_id').references("id").inTable("obras_turnos").notNullable().onDelete("CASCADE")
    table.bigInteger('servico_id').references("id").inTable("servicos").notNullable()
    table.float('quantidade').notNullable()
  });

exports.down = (knex) => knex.schema.dropTable("lancamentos");