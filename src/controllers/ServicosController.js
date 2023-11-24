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
      unidade
    });

    response.status(201).json();
  }

  async show(request, response) {
    return response.status(200).json({});
  }

  async update(request, response) {
    return response.status(201).json();
  }

  async index(request, response) {

    const servicos = await knex("servicos")

    response.status(200).json(servicos);
  }
}

module.exports = ServicosController;
