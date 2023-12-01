exports.up = (knex) =>
  knex.schema.createTable("turnos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("equipe_id").references("id").inTable("equipes").notNullable();
    table.date("data").notNullable();
    table.time("inicio_turno").notNullable();
    table.time("fim_turno").notNullable();
    table.time("inicio_deslocamento")
    table.time("fim_deslocamento")
    table.float("hodometro_inicial").notNullable();
    table.float("hodometro_final").notNullable();
    table.bigInteger("veiculo_id").references("id").inTable("veiculos").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("turnos");
