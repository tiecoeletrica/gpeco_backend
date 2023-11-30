const knex = require("../database/knex");
const AppError = require("../utils/AppError"); //importa biblioteca de erros

class Obras_TurnosController {
  async create(request, response) {
    const { obra_id, turno_id, fase_da_obra, retorno_campo, fora_programacao } = request.body;

    const [testeTurno] = await knex("turnos").where({ id: turno_id });

    if (!testeTurno) {
      throw new AppError("Turno não encontrado");
    }

    const [testeObra] = await knex("obras").where({ id: obra_id });
    console.log(testeObra)
    if (!testeObra) {
      throw new AppError("Essa obra não está cadastrada");
    }

    await knex("obras_turnos").insert({
      obra_id,
      turno_id,
      fase_da_obra,
      retorno_campo,
      fora_programacao,
    });

    response.status(201).json("Serviço de obra lançado com sucesso");
  }

  async show(request, response) {
    return response.status(200).json({});
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

module.exports = Obras_TurnosController;
