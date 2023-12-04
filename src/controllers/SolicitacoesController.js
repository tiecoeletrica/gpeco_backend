const { application } = require("express")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")
const authConfig = require("../config/auth")
const { sign } = require("jsonwebtoken")


class SolicitacoesController {
    async create(request, response) {
        const { nome, cpf, senha, email } = request.body

        const testeEmail = await knex("colaboradores").where({ email })
        const regexEcoeletrica = /\@ecoeletrica\.com\.br/

        if (!regexEcoeletrica.test(email)) {
            throw new AppError("e-mail não pertence a Ecoelétrica")
        }

        if (testeEmail.length > 0) {
            throw new AppError("e-mail já cadastrado")
        }

        const hashedSenha = await hash(senha, 8)

        await knex("solicitacoes").insert({
            nome, cpf, senha: hashedSenha, email
        })
        return response.status(201).json(`Solicitação de criação do(a) colaborador(a) ${nome}`);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("solicitacoes").where({ id }).delete();

        return response.status(200).json("Solicitação de cadastro deletada");
    }

    async index(request, response) {
        const solicitacoes = await knex("solicitacoes")

        response.status(200).json(solicitacoes);
    }

}


module.exports = SolicitacoesController