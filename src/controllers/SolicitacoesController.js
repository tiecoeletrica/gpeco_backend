const { application } = require("express")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")
const authConfig = require("../config/auth")
const {sign} = require("jsonwebtoken")


class SolicitacoesController {
    async create(request, response) {
        const {email,senha} = request.body

        
        const [colaborador] = await knex("colaboradores").where({ email })

        if (!colaborador) {
            throw new AppError("Email e/ou senha incorreta", 401)
        }

        const passwordMatched = await compare(senha, colaborador.senha)

        if(!passwordMatched) throw new AppError("Email e/ou senha incorreta", 401)

        const {secret,expiresIn} = authConfig.jwt
        const token = sign({},secret, {
            subject: String(colaborador.id),
            expiresIn
        })
        
        return response.json({colaborador,token});
    }

    
}


module.exports= SolicitacoesController