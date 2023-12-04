const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros


class Checklists_aprController {
    async create(request, response) {
        const { pergunta_resposta, tipo, categoria } = request.body;

        await knex("perguntas").insert({
            pergunta_resposta,
            tipo,
            categoria,
        });
        response.status(201).json("Pergunta ou resposta cadastrada");
    }

    async index(request, response) {
        const { tipo, categoria } = request.query

        let filter = {};

        if (tipo) filter.tipo = tipo
        if (categoria) filter.categoria = categoria

        const perguntas = await knex("perguntas")
            .where(filter)

        response.status(200).json(perguntas);
    }

    async show(request, response) {
        const { id } = request.params

        const [pergunta] = await knex("perguntas")
            .where({ id: id, data_final: null })

        if (!pergunta) throw new AppError("A pergunta não foi encontrada ou já foi encerrada")

        await knex("perguntas")
            .update({ data_final: knex.fn.now() })
            .where({ id })

        response.status(200).json(`A pergunta "${pergunta.pergunta_resposta}" foi encerrada`)
    }
}


module.exports = Checklists_aprController