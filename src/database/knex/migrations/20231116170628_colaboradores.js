exports.up = (knex) =>
  knex.schema.createTable("colaboradores", (table) => {
    table.bigIncrements("id");
    table.string("nome").notNullable();
    table.bigInteger("cpf").notNullable();
    table.bigInteger("email").notNullable();
    table.bigInteger("senha").notNullable();
    table.bigInteger("equipe_id").references("id").inTable("equipes");
    table.string("tipo").notNullable();
    table.boolean("status").notNullable().default(1);
  });

exports.down = (knex) => knex.schema.dropTable("colaboradores");
