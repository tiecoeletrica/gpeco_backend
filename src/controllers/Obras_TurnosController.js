const { application } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError"); //importa biblioteca de erros

class Obras_TurnosController {
  async create(request, response) {
    const { obra_id, turno_id, fase_da_obra, retorno_campo, fora_programacao, lancamentos } = request.body;

    const [testeTurno] = await knex("turnos").where({ id: turno_id });

    if (!testeTurno) {
      throw new AppError("Turno não encontrado");
    }

    const [testeObra] = await knex("obras").where({ id: obra_id });
    if (!testeObra) {
      throw new AppError("Essa obra não está cadastrada");
    }

    var obras_turnosID = await knex("obras_turnos").insert({
      obra_id,
      turno_id,
      fase_da_obra,
      retorno_campo,
      fora_programacao,
    });

    obras_turnosID = await Promise.all(obras_turnosID)

    lancamentos.map(async lanc => {
      await knex("lancamentos").insert({
        obras_turnos_id: obras_turnosID[0],
        servico_id: lanc.servico_id,
        quantidade: lanc.quantidade
      })
    })

    response.status(201).json("Serviço de obra lançado com sucesso");
  }

  async delete(request, response) {
    const {id} = request.params

    const [verificarID] = await knex("obras_turnos").where({id})

    if(!verificarID) throw new AppError("ID de obras_turnos não encontrado")

    await knex("obras_turnos").where({id}).delete()
    
    return response.status(201).json("Registro de obra deletado");
  }

  async update(request, response) {
    response.status(200).json();
  }
}

module.exports = Obras_TurnosController;
