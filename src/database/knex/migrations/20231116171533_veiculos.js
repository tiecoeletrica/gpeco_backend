exports.up = (knex) =>
  knex.schema.createTable("veiculos", (table) => {
    table.bigIncrements('id')
    table.bigInteger('placa').notNullable()
    table.bigInteger('tipo').notNullable()
    table.bigInteger('equipe_id').notNullable().comment("ultima equipe a usar o veiculo")
  });

exports.down = (knex) => knex.schema.dropTable("veiculos");