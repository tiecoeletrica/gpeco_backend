const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros


class Checklists_aprController {
    async create(request, response) {
        const { tipo, pergunta_id, turno_id, atividade, obras_turnos_id, medida_id } = request.body

        switch (tipo) {
            case 'apr':
                if (!pergunta_id || !medida_id || !obras_turnos_id || !atividade) throw new AppError("Há algum parâmetro nulo")

                const [testePergunta] = await knex("perguntas").where({ id: pergunta_id })
                const [testeMedida] = await knex("perguntas").where({ id: medida_id })
                const [testeObras_Turnos] = await knex("obras_turnos").where({ id: obras_turnos_id })

                if (!testePergunta) throw new AppError("Id de pergunta não localizado")
                if (!testeMedida) throw new AppError("Id de medida não localizado")
                if (!testeObras_Turnos) throw new AppError("Id de obras_turnos não localizado")

                await knex("aprs").insert({
                    atividade,
                    obras_turnos_id,
                    pergunta_id,
                    medida_id
                })
                break;
            case 'smc':
            case 'veicular':
            case 'epi':
                if (!pergunta_id || !turno_id) throw new AppError("Há algum parâmetro nulo")
                const [testePerguntaCL] = await knex("perguntas").where({ id: pergunta_id })
                const [testeTurno] = await knex("turnos").where({ id: turno_id })

                if (!testePerguntaCL) throw new AppError("Id de pergunta não localizado")
                if (!testeTurno) throw new AppError("Id de medida não localizado")

                await knex("checklists").insert({
                    tipo_checklist: tipo,
                    turno_id,
                    pergunta_id
                })

                break;
            default:
                throw new AppError("Tipo de checklist ou apr não encontrado")
        }

        response.status(201).json(`Lançamento de ${tipo} cadastrado`);
    }

    async index(request, response) {


        response.status(200).json(perguntas);
    }

    async show(request, response) {


        response.status(200).json(`A pergunta "${pergunta.pergunta_resposta}" foi encerrada`)
    }
}


module.exports = Checklists_aprController