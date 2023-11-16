exports.up = (knex) =>
  knex.schema.createTable("programacoes", (table) => {
    table.bigIncrements("id");
    table.bigInteger("obra_id").references("id").inTable("obras").notNullable();
    table.bigInteger("equipe_id").references("id").inTable("equipes").notNullable();
    table.date("data_inicial").notNullable();
    table.date("data_final").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("programacoes");
