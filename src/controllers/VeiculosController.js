const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros



class VeiculosController {
    async create(request, response) {
        const {placa, tipo, equipe_id} = request.body

        const [testePlaca] = await knex("veiculos").where({placa})


        if(testePlaca){
            throw new AppError("Já existe um veículo cadastrado com essa placa")     
        }

        const [testeEquipe] = await knex("equipes").where({id:equipe_id})


        if(!testeEquipe){
            throw new AppError("Não existe uma equipe com esse id")     
        }


        await knex("veiculos").insert({
            placa, tipo, equipe_id
        })
        

        response.status(201).json("Veículo cadastrado");

    }

    async show(request, response) {
        const {id} = request.params

        const veiculo = await knex("veiculos").where({id})
        
        return response.status(200).json(veiculo)
    }

    async update(request, response) {
        const {placa, tipo, equipe_id} = request.body
        const {id} = request.params

        const [testePlaca] = await knex("veiculos").where({placa}).whereNot({id})
        
        
        if(testePlaca){
            throw new AppError("Já existe um veículo cadastrado com essa placa")     
        }

        const [testeEquipe] = await knex("equipes").where({id:equipe_id})
        

        if(!testeEquipe){
            throw new AppError("Não existe uma equipe com esse id")     
        }

        const [veiculo] = await knex("veiculos").where({id})
        
        veiculo.placa = placa ?? veiculo.placa
        veiculo.tipo = tipo ?? veiculo.tipo
        veiculo.equipe_id = equipe_id ?? veiculo.equipe_id

        await knex("veiculos").where({id}).update({
            placa: veiculo.placa, 
            tipo: veiculo.tipo, 
            equipe_id:veiculo.equipe_id
        })

       
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