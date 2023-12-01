const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros
const { hash, compare } = require("bcryptjs")



class PerguntasController {
    async create(request, response) {
        const { pergunta_resposta, tipo, categoria } = request.body;

        const [pergunta] = await knex("perguntas").where({ pergunta_resposta });

        if (pergunta) {
            throw new AppError("Essa pergunta ou resposta já está cadastrada");
        }

        await knex("perguntas").insert({
            pergunta_resposta,
            tipo,
            categoria,
        });
        response.status(201).json("Pergunta ou resposta cadastrada");
    }

    async index(request, response) {
        const {tipo, categoria} = request.query
        
        let filter = {};

        if (tipo) filter.tipo =tipo
        if (categoria) filter.categoria =categoria
    
        const perguntas = await knex("perguntas")
        .where(filter)
        
        response.status(200).json(perguntas);
    }

    async update(request, response) {

        response.status(200).json()
    }
}


module.exports = PerguntasController