const knex = require("../database/knex");
const AppError = require("../utils/AppError"); //importa biblioteca de erros

class ServicosController {
  async create(request, response) {
    const { codigo, descricao, unidade } = request.body;

    const [testeServico] = await knex("servicos").where({ codigo });

    if (testeServico) {
      throw new AppError("Já existe um serviço cadastrado com esse código");
    }

    await knex("servicos").insert({
      codigo,
      descricao,
      unidade,
    });

    response.status(201).json();
  }

  async show(request, response) {
    const {id} = request.params

    const [servicos] = await knex("servicos").where({id});

    if(!servicos) throw new AppError("Serviço não cadastrado")

    return response.status(200).json(servicos);
  }

  async update(request, response) {
    const { codigo, descricao, unidade } = request.body;
    const {id} = request.params

    const [testeCodigo] = await knex("servicos")
        .where({codigo})
        .whereNot({id})

    if(testeCodigo) throw new AppError("Já existe um serviço com esse código")

    const [testeId] = await knex("servicos")
        .where({id})

    if(!testeId) throw new AppError("Serviço não encontrado")

    const [servico] = await knex("servicos").where({id})

    servico.codigo = codigo ?? servico.codigo
    servico.unidade = unidade ?? servico.unidade
    servico.descricao = descricao ?? servico.descricao

    await knex("servicos")
        .where({id})
        .update({
           codigo: servico.codigo,
           unidade: servico.unidade,
           descricao: servico.descricao
        })

    return response.status(201).json();
  }

  async index(request, response) {
    const servicos = await knex("servicos");

    response.status(200).json(servicos);
  }
}

module.exports = ServicosController;
