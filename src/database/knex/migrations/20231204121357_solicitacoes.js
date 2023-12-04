exports.up = (knex) =>
  knex.schema.createTable("solicitacoes", (table) => {
    table.bigIncrements("id");
    table.string("nome").notNullable();
    table.bigInteger("cpf").notNullable();
    table.bigInteger("email").notNullable();
    table.bigInteger("senha").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("solicitacoes");

