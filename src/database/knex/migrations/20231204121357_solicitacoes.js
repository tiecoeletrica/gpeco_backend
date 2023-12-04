exports.up = (knex) =>
  knex.schema.createTable("solicitacoes", (table) => {
    table.bigIncrements("id");
    table.string("nome").notNullable();
    table.bigInteger("cpf").notNullable();
    table.string("email").notNullable();
    table.string("senha").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("solicitacoes");

