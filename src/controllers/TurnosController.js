const knex = require("../database/knex");
const AppError = require("../utils/AppError"); //importa biblioteca de erros

class TurnosController {
  async create(request, response) {
    const {
      equipe_id,
      data,
      inicio_turno,
      fim_turno,
      inicio_deslocamento,
      fim_deslocamento,
      hodometro_inicial,
      hodometro_final,
      veiculo_id,
    } = request.body;

    const [testeTurno] = await knex("turnos").where({ equipe_id, data });

    if (testeTurno) {
      throw new AppError(
        "Já existe um lançmento de turno dessa equipe para essa data"
      );
    }

    const [testeEquipe] = await knex("equipes").where({ id: equipe_id });

    if (!testeEquipe) {
      throw new AppError("Essa equipe não está cadastrada");
    }

    const [testeVeiculo] = await knex("veiculos").where({ id: veiculo_id });

    if (!testeVeiculo) {
      throw new AppError("Esse veículo não está cadastrado");
    }

    await knex("turnos").insert({
      equipe_id,
      data,
      inicio_turno,
      fim_turno,
      inicio_deslocamento,
      fim_deslocamento,
      hodometro_inicial,
      hodometro_final,
      veiculo_id,
    });

    response.status(201).json("Turno inserido no banco de dados com sucesso");
  }

  async show(request, response) {
    const { id } = request.params;

    const turno = await knex("turnos").where({ id });

    const colaboradores = await knex("colaboradores_turnos")
      .select("colaboradores.nome")
      .innerJoin(
        "colaboradores",
        "colaboradores.id",
        "colaboradores_turnos.colaborador_id"
      )
      .where("colaboradores_turnos.turno_id", id);

    const obras_turnos = await knex("obras_turnos")
      .innerJoin("obras", "obras.id", "obras_turnos.obra_id")
      .innerJoin(
        "lancamentos",
        "lancamentos.obras_turnos_id",
        "obras_turnos.id"
      )
      .innerJoin("servicos", "servicos.id", "lancamentos.servico_id")
      .where("obras_turnos.turno_id", id);

    return response.status(200).json({ turno, colaboradores, obras_turnos });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("turnos").where({ id }).delete();

    return response.status(201).json("Turno deletado");
  }

  async index(request, response) {
    const { equipe_id, data_inicial, data_final } = request.query;

    let filter = {};

    if (equipe_id) filter.equipe_id = equipe_id;

    const turnos = await knex("turnos")
      .select([
        "turnos.id",
        "equipes.equipe",
        "colaboradores.nome",
        "turnos.data",
        "veiculos.placa",
      ])
      .where((builder) => {
        if (equipe_id) {
          builder.where("turnos.equipe_id", equipe_id);
        }
      })
      .whereBetween("turnos.data", [
        data_inicial ?? "1900-01-01",
        data_final ?? "2050-01-01",
      ])
      .innerJoin("equipes", "equipes.id", "turnos.equipe_id")
      .innerJoin("veiculos", "veiculos.id", "turnos.veiculo_id")
      .innerJoin("colaboradores", "colaboradores.id", "equipes.lider_id");

    response.status(200).json(turnos);
  }

  async update(request, response) {
    const {
      equipe_id,
      data,
      inicio_turno,
      fim_turno,
      inicio_deslocamento,
      fim_deslocamento,
      hodometro_inicial,
      hodometro_final,
      veiculo_id,
    } = request.body;

    const { id } = request.params;
    
    const [turno] = await knex("turnos").where({ id });

    const [testeTurnoData] = await knex("turnos")
      .where({ equipe_id: equipe_id ?? turno.equipe_id, data: data ?? turno.data })
      .whereNot({ id });

    if (testeTurnoData) {
      throw new AppError(
        "Essa equipe já possui um turno registrado nessa data"
      );
    }

    const [testeEquipe] = await knex("equipes").where({ id: equipe_id ?? turno.equipe_id});

    if (!testeEquipe) {
      throw new AppError("Essa equipe não está cadastrada");
    }

    const [testeVeiculo] = await knex("veiculos").where({ id: veiculo_id ?? turno.veiculo_id});

    if (!testeVeiculo) {
      throw new AppError("Esse veículo não está cadastrado");
    }

    turno.equipe_id = equipe_id ?? turno.equipe_id;
    turno.data = data ?? turno.data;
    turno.inicio_turno = inicio_turno ?? turno.inicio_turno;
    turno.fim_turno = fim_turno ?? turno.fim_turno;
    turno.inicio_deslocamento = inicio_deslocamento ?? turno.inicio_deslocamento;
    turno.fim_deslocamento = fim_deslocamento ?? turno.fim_deslocamento;
    turno.hodometro_inicial = hodometro_inicial ?? turno.hodometro_inicial;
    turno.hodometro_final = hodometro_final ?? turno.hodometro_final;
    turno.veiculo_id = veiculo_id ?? turno.veiculo_id;

    await knex("turnos").where({ id }).update({
      equipe_id: turno.equipe_id,
      data: turno.data,
      inicio_turno: turno.inicio_turno,
      fim_turno: turno.fim_turno,
      inicio_deslocamento: turno.inicio_deslocamento,
      fim_deslocamento: turno.fim_deslocamento,
      hodometro_inicial: turno.hodometro_inicial,
      hodometro_final: turno.hodometro_final,
      veiculo_id: turno.veiculo_id,
    });

    response.status(200).json();
  }
}

module.exports = TurnosController;
