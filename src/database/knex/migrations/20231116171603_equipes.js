exports.up = (knex) =>
  knex.schema.createTable("equipes", (table) => {
    table.bigIncrements("id");
    table.string("equipe").notNullable();
    table.bigInteger("lider_id").comment("id do líder da equipe");
    table.bigInteger("supervisor_id");
    table.bigInteger("coordenador_id");
    table.string("contrato").notNullable();
    table.string("tipo").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("equipes");
