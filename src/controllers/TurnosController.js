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
    const teste = await knex("turnos").where("inicio_turno",">","07:10:00")

    return response.status(200).json(teste);
  }

  async delete(request, response) {
    return response.status(201).json("Nota deletada");
  }

  async index(request, response) {
    response.status(200).json();
  }

  async update(request, response) {
    response.status(200).json();
  }
}

module.exports = TurnosController;
