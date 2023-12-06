const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros


class Checklists_aprController {
    async create(request, response) {
        const { tipo, pergunta_id, turno_id, atividade, obras_turnos_id, medida_ids, pergunta_ids, fotos_turno } = request.body

        switch (tipo) {
            case 'apr':
                if (!pergunta_ids || !medida_ids || !obras_turnos_id || !atividade) throw new AppError("Há algum parâmetro nulo")

                const perguntas = pergunta_ids.split(",").map(id => Number(id))
                const medidas = medida_ids.split(",").map(id => Number(id))

                await Promise.all(perguntas.map(async pergunta => {
                    const [testePergunta] = await knex("perguntas").where({ id: pergunta })
                    if (!testePergunta) throw new AppError(`Id ${pergunta} de pergunta não localizado`)
                }))

                await Promise.all(medidas.map(async medida => {
                    const [testeMedida] = await knex("perguntas").where({ id: medida })
                    if (!testeMedida) throw new AppError(`Id ${medida} de medida não localizado`)
                }))

                const [testeObras_Turnos] = await knex("obras_turnos").where({ id: obras_turnos_id })
                if (!testeObras_Turnos) throw new AppError(`Id ${obras_turnos_id} de obras_turnos não localizado`)

                const [apr] = await knex("aprs").where({ obras_turnos_id })
                if (apr) throw new AppError("Essa obra já possui apr")

                await knex("aprs").insert({
                    atividade,
                    obras_turnos_id,
                    pergunta_ids,
                    medida_ids
                })

                fotos_turno.map(async foto => {
                    await knex("fotos").insert({
                        tipo: foto.tipo,
                        link_drive: foto.link_drive,
                        turno_id: testeObras_Turnos.turno_id,
                        obras_turnos_id
                    })
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
            var pergunta_apr = await knex("aprs").where({ obras_turnos_id }).select("atividade")
        } else if (!obras_turnos_id) pergunta_apr = await knex("checklists").where({ turno_id }).select(["tipo_checklist"]).distinct()

        response.status(200).json(pergunta_apr);
    }

    async show(request, response) {
        const { id, tipo } = request.params

        switch (tipo) {
            case 'apr':
                const [apr] = await knex("aprs").where({ obras_turnos_id: id })
                if (!apr) throw new AppError("Apr não encontrada para essa obra")

                const arrayRiscos = apr.pergunta_ids.split(",").map(pergunta => Number(pergunta))
                var riscos = await knex("perguntas")
                    .whereIn("id", arrayRiscos)
                    .select("categoria")
                    .distinct()

                riscos = riscos.map(risco => risco.categoria)

                riscos = await Promise.all(riscos.map(async risco => {
                    const auxPerguntas = await knex("perguntas")
                        .whereIn("id", arrayRiscos)
                        .andWhere("categoria", risco)
                        .select("pergunta_resposta")

                    const result = {};
                    result[risco] = auxPerguntas.map(item => item.pergunta_resposta);
                    return result;
                }))

                const arrayMedidas = apr.medida_ids.split(",").map(pergunta => Number(pergunta))
                var medidas = await knex("perguntas")
                    .whereIn("id", arrayMedidas)
                    .select("categoria")
                    .distinct()

                medidas = medidas.map(medida => medida.categoria)

                medidas = await Promise.all(medidas.map(async medida => {
                    const auxPerguntas = await knex("perguntas")
                        .whereIn("id", arrayMedidas)
                        .andWhere("categoria", medida)
                        .select("pergunta_resposta")

                    const result = {};
                    result[medida] = auxPerguntas.map(item => item.pergunta_resposta);
                    return result;
                }))

                const fotos = await knex("fotos").where({obras_turnos_id:id}).select("link_drive")

                var resultado = { riscos, medidas, fotos }


                break;
            case 'smc':
            case 'veicular':
            case 'epi':
                const [testeChecklist] = await knex("checklists").where({ turno_id: id, tipo_checklist: tipo })
                if (!testeChecklist) throw new AppError(`Checklist ${tipo} não encontrado para essa obra`)

                const [{ data }] = await knex("turnos")
                    .select(["turnos.data"])
                    .where({ id })

                console.log(data)
                const perguntas = await knex("perguntas")
                    .select("pergunta_resposta")
                    .where({ tipo })
                    .andWhere((builder) =>
                        builder
                            .where("data_inicial", "<", data + " 00:00:00")
                            .andWhere((subbuilder) =>
                                subbuilder
                                    .where("data_final", ">", data + " 00:00:00")
                                    .orWhereNull("data_final")
                            )
                    );

                var inconsistencias = await knex("checklists")
                    .where({ tipo_checklist: tipo })
                    .andWhere("turno_id", id)
                    .select("pergunta_id")

                inconsistencias = await Promise.all(inconsistencias.map(async inc => {
                    const [result] = await knex("perguntas").where({ id: inc.pergunta_id }).select("pergunta_resposta")
                    return result
                }))

                var resultado = { perguntas, inconsistencias }


                break;
            default:
                throw new AppError("Tipo de relatório não cadastrado")
        }

        response.status(200).json(resultado)
    }
}


module.exports = Checklists_aprController