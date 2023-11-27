const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros



class ProgramacoesController {
    async create(request, response) {
        const programacoes = request.body;

        if (!Array.isArray(programacoes)) {
            throw new AppError("O corpo da solicitação deve conter um array de programacoes");
        }


        var repetidos = await knex("orcamentos")
            .select("N_PROJETO", "MATERIAL", "ORCADO")
            .whereIn(
                ["N_PROJETO", "MATERIAL", "ORCADO"],
                programacoes.map(material => [material.N_PROJETO, material.MATERIAL, material.ORCADO]))
            .distinct()


        if (repetidos.length > 0) {
            repetidos = repetidos.map(repetido => repetido.N_PROJETO + " - " + repetido.MATERIAL + " - " + repetido.ORCADO)
            throw new AppError(`Já existem esses orçamentos: ${repetidos}`)
        }


        programacoes.map(async (material) => {
            const { N_PROJETO, MATERIAL, ORCADO } = material

            await knex("orcamentos").insert({
                N_PROJETO, MATERIAL, ORCADO
            })
        })


        response.status(201).json();
    }

    async show(request, response) {
        
        return response.status(200).json({
           
        })
    }

    async delete(request, response) {
       
        return response.status(201).json("Nota deletada")
    }

    async index(request, response) {
        
        
        response.status(200).json()
    }

    async update(request, response) {
        
        
        response.status(200).json()
    }
}


module.exports = ProgramacoesController