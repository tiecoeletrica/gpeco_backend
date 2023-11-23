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
        "Já existe um lançmento de turno dessa equipe nessa tada"
      );
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
    const teste = await knex("turnos").where("inicio_turno", ">", "07:10:00");

    return response.status(200).json(teste);
  }

  async delete(request, response) {
    return response.status(201).json("Nota deletada");
  }

  async index(request, response) {
    const { equipe_id, data_inicial, data_final } = request.query;

    let filter = {};

    if (equipe_id) filter.equipe_id = equipe_id;

    const turnos = await knex("turnos")
      .select(["turnos.id", "equipes.equipe", "colaboradores.nome", "turnos.data", "veiculos.placa"])
      .where((builder) => {
        if (equipe_id) {
          builder.where("turnos.equipe_id", equipe_id);
        }
      })
      .whereBetween("turnos.data",[data_inicial??"1900-01-01",data_final??"2050-01-01"])
      .innerJoin("equipes","equipes.id","turnos.equipe_id")
      .innerJoin("veiculos","veiculos.id","turnos.veiculo_id")
      .innerJoin("colaboradores","colaboradores.id","equipes.lider_id")

    response.status(200).json(turnos);
  }

  async update(request, response) {
    response.status(200).json();
  }
}

module.exports = TurnosController;
