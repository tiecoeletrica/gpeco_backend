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
    const {id} = request.params

    const [obra] = await knex("obras").where({id})

    if(!obra) throw new AppError("Obra não encontrada")

    return response.status(200).json(obra);
  }

  async update(request, response) {
    const { projeto, descricao, status, carteira, cidade, utd } = request.body
    const {id} = request.params
    
    const [obra] = await knex("obras").where({id})
    
    const [testeObra] = await knex("obras")
    .where({projeto: projeto ?? obra.projeto,carteira: carteira ?? obra.carteira})
    .whereNot({id})
    
    if(testeObra) throw new AppError("Essa obra já se encontra nessa carteira")

    const [testeId] = await knex("obras")
    .where({id})
    
    if(!testeId) throw new AppError("Obra não encontrado")
    
    obra.projeto = projeto ?? obra.projeto
    obra.descricao = descricao ?? obra.descricao
    obra.status = status ?? obra.status
    obra.carteira = carteira ?? obra.carteira
    obra.cidade = cidade ?? obra.cidade
    obra.utd = utd ?? obra.utd

    await knex("obras")
        .where({id})
        .update({
            projeto :  obra.projeto,
            descricao :  obra.descricao,
            status :  obra.status,
            carteira :  obra.carteira,
            cidade :  obra.cidade,
            utd :  obra.utd
        })


    return response.status(200).json("Obra atualizada");
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
