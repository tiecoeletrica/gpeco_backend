const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros
const {hash, compare} = require("bcryptjs")



class PerguntasController {
    async create(request, response) {
       
        response.status(201).json("Usuário criado");
    }

    async index(request, response) {

        response.status(200).json(usuarios);
    }

    async update(request, response) {
        
        response.status(200).json()
    }
}


module.exports = PerguntasController