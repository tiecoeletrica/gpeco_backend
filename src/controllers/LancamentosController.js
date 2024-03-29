const { application } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError"); //importa biblioteca de erros

class LancamentosController {
  async create(request, response) {
    const { obras_turnos_id, servico_id, quantidade} = request.body;

    if( !obras_turnos_id || !servico_id || !quantidade) throw new AppError("Há parametros vazios")

    const [testeObras_Turnos] = await knex("obras_turnos").where({ id: obras_turnos_id });

    if (!testeObras_Turnos) {
      throw new AppError("Obras_Turnos não encontrado");
    }

    const [testeServicoID] = await knex("servicos").where({ id: servico_id});
    if (!testeServicoID) {
      throw new AppError("Serviço não cadastrado");
    }

    const testeLancamentos = await knex("lancamentos").where({obras_turnos_id,servico_id})

    if(testeLancamentos) throw new AppError("Serviço já lançado para essa obra, insira outro lançaamento ou modifique o que já existe")

    await knex("lancamentos").insert({
      obras_turnos_id,
      servico_id,
      quantidade,
    });


    response.status(201).json("Lançamento feito com sucesso");
  }

  async delete(request, response) {
    const {id} = request.params

    const [verificarID] = await knex("lancamentos").where({id})

    if(!verificarID) throw new AppError("ID lançamento não encontrado")

    await knex("lancamentos").where({id}).delete()
    
    return response.status(200).json("Lançamento deletado");
  }

  async update(request, response) {
    const {quantidade} = request.body
    const {id} = request.params

    if(!quantidade) throw new AppError("Campo de 'quantidade' vazio")
    
    await knex("lancamentos").where({id}).update({
      quantidade
    })

    response.status(200).json();
  }
}

module.exports = LancamentosController;
