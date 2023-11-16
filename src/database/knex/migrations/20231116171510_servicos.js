exports.up = (knex) =>
  knex.schema.createTable("servicos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("codigo").notNullable();
    table.string("descricao").notNullable();
    table.string("unidade");
  });

exports.down = (knex) => knex.schema.dropTable("servicos");
