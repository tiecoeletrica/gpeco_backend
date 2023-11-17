const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros



class ColaboradoresController {
    async create(request, response) {
        

        response.status(201).json();
    }

    async show(request, response) {
        
        return response.status(200).json({
           
        })
    }

    async delete(request, response) {
       
        return response.status(201).json("Nota deletada")
    }

    async index(request, response) {
        
        
        response.status(200).json(notesWhithTags)
    }
}


module.exports = ColaboradoresController