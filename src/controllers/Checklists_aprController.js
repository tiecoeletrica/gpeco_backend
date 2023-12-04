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
        const { turno_id, obras_turnos_id } = request.query

        if (turno_id && obras_turnos_id) throw new AppError("Enviei somente o id do turno ou da obra_turno, não os dois")
        if (!turno_id && !obras_turnos_id) throw new AppError("Enviei como parametro de query obras_turnos_id ou turnos_id")

        if (!turno_id) {
            var pergunta_apr = await knex("aprs").where({ obras_turnos_id })
        } else if (!obras_turnos_id) pergunta_apr = await knex("checklists").where({ turno_id })


        response.status(200).json(pergunta_apr);
    }

    async show(request, response) {
        const { id, tipo } = request.params

        switch (tipo) {
            case 'apr':
                const [apr] = await knex("aprs").where({ id })
                if (!apr) throw new AppError("Id de APR não encontrado")

                const [{ data }] = await knex("aprs")
                    .leftJoin("obras_turnos", "obras_turnos.id", "aprs.obras_turnos_id")
                    .leftJoin("turnos", "turnos.id", "obras_turnos.turno_id")
                    .select(["turnos.data"])
                    .where("aprs.id", id)

                    console.log(data)
                var perguntas = await knex("perguntas")
                    .where({ tipo: "apr" })
                    .andWhere("data_inicial", "<=", data+" 00:00:00")
                    // .andWhere("data_final", ">=", data)
                    // .orWhere("data_final", null)

                break;
            case 'smc':
            case 'veicular':
            case 'epi':

                break;
            default:
                throw new AppError("Tipo de relatório não cadastrado")
        }

        response.status(200).json(perguntas)
    }
}


module.exports = Checklists_aprController