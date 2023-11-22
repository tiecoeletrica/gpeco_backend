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
        const {nome, email, senha, senhaAntiga, status, cpf} = request.body
        const {id} = request.params;
        
        const [colaborador] = await knex("colaboradores").where({id})
        console.log(colaborador)

        if(!colaborador){
            throw new AppError("Usuário não encontrado")
        }
        
        colaborador.nome = nome ?? colaborador.nome
        colaborador.email = email ?? colaborador.email
        colaborador.status = status ?? colaborador.status
        colaborador.cpf = cpf ?? colaborador.cpf
        colaborador.equipe_id = equipe_id ?? colaborador.equipe_id
        
        if(!senha || !senhaAntiga){
            throw new AppError("Informe a senha antiga e a senha nova")
        }

        
        const comparacaoSenha = await compare(senhaAntiga,colaborador.senha)
        
        if(!comparacaoSenha){
            throw new AppError("A senha atual não confere com a atual")
        }

        const hashedSenha = await hash(senha, 8)

        await knex("colaboradores").where({id}).update({
            nome: colaborador.nome,
            email: colaborador.email,
            status: colaborador.status,
            cpf: colaborador.cpf,
            equipe_id: colaborador.equipe_id,
            senha: hashedSenha
        })
        
        response.status(200).json()
    }
}


module.exports = ColaboradoresController