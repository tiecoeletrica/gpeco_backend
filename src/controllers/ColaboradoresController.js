const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros
const {hash, compare} = require("bcryptjs")



class ColaboradoresController {
    async create(request, response) {
        const {nome, cpf, senha, email, tipo} = request.body

        const testeEmail = await knex("colaboradores").where({email})
        const regexEcoeletrica = /\@ecoeletrica\.com\.br/

        if(!regexEcoeletrica.test(email)){
            throw new AppError("e-mail não pertence a Ecoelétrica")     
        }

        if(testeEmail.length  > 0){
            throw new AppError("e-mail já cadastrado")     
        }

        const hashedSenha = await hash(senha, 8)

        await knex("colaboradores").insert({
            nome, cpf, senha:hashedSenha, tipo, email
        })
        

        response.status(201).json("Usuário Criado");
    }

    async index(request, response) {
        const usuarios = await knex("colaboradores").select(["id","nome","cpf","email","tipo"])

        response.status(200).json(usuarios);
    }

    async show(request, response) {
        const { id } = request.params

        const colaborador = await knex("colaboradores").where({id})
        
        return response.status(200).json(colaborador)
    }

    async update(request, response) {
        
        
        response.status(200).json()
    }
}


module.exports = ColaboradoresController