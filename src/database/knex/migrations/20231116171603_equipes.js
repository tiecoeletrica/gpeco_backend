exports.up = (knex) =>
  knex.schema.createTable("equipes", (table) => {
    table.bigIncrements("id");
    table.string("equipe").notNullable();
    table.bigInteger("lider_id").references("id").inTable("colaboradores").comment("id do líder da equipe");
    table.bigInteger("supervisor_id").references("id").inTable("colaboradores");
    table.bigInteger("coordenador_id").references("id").inTable("colaboradores");
    table.string("contrato").notNullable();
    table.string("tipo").notNullable();
    table.boolean("status").notNullable().default(1);
  });

exports.down = (knex) => knex.schema.dropTable("equipes");
