const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros



class AutenticacaoController {
    async create(request, response) {
        

        response.status(201).json();
    }

    
}


module.exports = AutenticacaoController