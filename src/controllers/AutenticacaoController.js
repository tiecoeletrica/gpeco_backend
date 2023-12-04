const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")
const authConfig = require("../config/auth")
const {sign} = require("jsonwebtoken")


class AutenticacaoController {
    async create(request, response) {
        const {email,senha} = request.body

        if(!email || !senha) throw new AppError("email e/ou senha estão vazios")
        
        const [colaborador] = await knex("colaboradores").where({ email })

        if (!colaborador) {
            throw new AppError("Email e/ou senha incorreta", 401)
        }

        const passwordMatched = await compare(senha, colaborador.senha)

        if(!passwordMatched)  return response.status(401).json("Erro para rafa")

        const {secret,expiresIn} = authConfig.jwt
        const token = sign({},secret, {
            subject: String(colaborador.id),
            expiresIn
        })
        
        return response.json({colaborador,token});
    }

    
}


module.exports= AutenticacaoController