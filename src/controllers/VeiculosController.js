const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros



class VeiculosController {
    async create(request, response) {
        const {placa, tipo, equipe_id} = request.body

        const [testePlaca] = await knex("veiculos").where({placa})


        if(testePlaca){
            throw new AppError("Já existe um veículo cadastrado com essa placa")     
        }


        await knex("veiculos").insert({
            placa, tipo, equipe_id
        })
        

        response.status(201).json("Veículo cadastrado");

    }

    async show(request, response) {
        
        return response.status(200).json({
           
        })
    }

    async update(request, response) {
       
        return response.status(201).json()
    }

    async index(request, response) {
        const {tipo} = request.query

        let filter = {};

        if (tipo) filter.tipo = tipo;

        const equipes = await knex("veiculos")
            .select(["id","placa","tipo","equipe_id"])
            .where(filter)

        response.status(200).json(equipes);
    }

}


module.exports = VeiculosController