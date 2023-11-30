const knex = require("../database/knex");
const AppError = require("../utils/AppError"); //importa biblioteca de erros

class ProgramacoesController {
  async create(request, response) {
    const programacoes = request.body;

    if (!Array.isArray(programacoes)) {
      throw new AppError(
        "O corpo da solicitação deve conter um array de programações"
      );
    }

    // console.log(programacoes)
    var programacao = [];
    programacao = programacoes.map(async (prog) => {
      let { obra, equipe, data } = prog;
      const obraID = await knex("obras")
        .select(["id"])
        .where({ projeto: obra })
        .first();

      const equipeID = await knex("equipes")
        .select(["id"])
        .where({ equipe: equipe })
        .first();

      var auxData = data.split("/");
      auxData = auxData[2] + "-" + auxData[1] + "-" + auxData[0];

      //console.log(obraID.id, equipeID.id, auxData);
      return { obra_id: obraID.id, equipe_id: equipeID.id, data: auxData };
    });

    const resolvedProgramacao = await Promise.all(programacao);

    await knex("programacoes").delete();
    resolvedProgramacao.map(async (prog) => {
      const { obra_id, equipe_id, data } = prog;

      await knex("programacoes").insert({
        obra_id,
        equipe_id,
        data,
      });
    });

    response.status(201).json("Programação inserida com sucesso");
  }

  async show(request, response) {
    return response.status(200).json({});
  }

  async delete(request, response) {
    return response.status(201).json("Nota deletada");
  }

  async index(request, response) {
    const { equipe_id,obra_id, data } = request.query;

    let filter = {};

    if (equipe_id) filter.equipe_id =equipe_id
    if (obra_id) filter.obra_id =obra_id
    if (data) filter.data = data;

    const programacoes = await knex("programacoes")
      .where(filter)

    response.status(200).json(programacoes);
  }

  async update(request, response) {

    
    response.status(200).json();
  }
}

module.exports = ProgramacoesController;
