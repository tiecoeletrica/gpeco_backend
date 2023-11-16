exports.up = (knex) =>
  knex.schema.createTable("programacoes", (table) => {
    table.bigIncrements("id");
    table.bigInteger("obra_id").notNullable();
    table.bigInteger("equipe_id").notNullable();
    table.date("data_inicial").notNullable();
    table.date("data_final").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("programacoes");
