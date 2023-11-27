const knex = require("../database/knex");
const AppError = require("../utils/AppError"); //importa biblioteca de erros

class ObrasController {
  async create(request, response) {
    const obras = request.body;

    if (!Array.isArray(obras)) {
      throw new AppError(
        "O corpo da solicitação deve conter um array de obras"
      );
    }

    var repetidos = await knex("obras")
      .select("projeto", "carteira")
      .whereIn(
        ["projeto", "carteira"],
        obras.map((obra) => [obra.projeto, obra.carteira])
      )
      .distinct();

    if (repetidos.length > 0) {
      repetidos = repetidos.map(
        (repetido) => repetido.projeto + " - " + repetido.carteira
      );
      throw new AppError(
        `Essas obras já estão no banco de dados: ${repetidos}`
      );
    }

    obras.map(async (obra) => {
      const { projeto, descricao, status, carteira, cidade, utd } = obra;

      await knex("obras").insert({
        projeto,
        descricao,
        status,
        carteira,
        cidade,
        utd,
      });
    });

    response.status(201).json("Obras inseridas no GPECO");
  }

  async show(request, response) {
    return response.status(200).json({});
  }

  async update(request, response) {
    return response.status(201).json();
  }

  async index(request, response) {
    const { projeto, status, carteira, cidade, utd } = request.query;

    let filter = {};

    if (status) filter.status = status;
    if (carteira) filter.carteira = carteira;
    if (cidade) filter.cidade = cidade;
    if (utd) filter.utd = utd;

    const obras = await knex("obras")
      .where(filter)
      .where((builder) => {
        if (projeto) {
          builder.whereLike("projeto", `%${projeto}%`);
        }
      });

    response.status(200).json(obras);
  }
}

module.exports = ObrasController;
