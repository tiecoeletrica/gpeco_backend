const knex = require("../database/knex")
const AppError = require("../utils/AppError") //importa biblioteca de erros



class EquipesController {
    async create(request, response) {
        const {equipe, tipo,lider_id, supervisor_id, coordenador_id, contrato} = request.body

        const [testeEquipe] = await knex("equipes").where({equipe})
        
        if(testeEquipe){
            throw new AppError("nome de equipe já utilizado")     
        }

        const [testeLider] = await knex("equipes").where({lider_id})

        if(testeLider){
            throw new AppError("Esse colaborador já é líder de outra equipe")     
        }

        if(lider_id){
            const [testeColaboradores] = await knex("colaboradores").where({id:lider_id ?? ""})
            
            if(!testeColaboradores){
                throw new AppError("Líder não cadastrado")     
            }
        }
        if(supervisor_id){
            const [testeColaboradores] = await knex("colaboradores").where({id:supervisor_id ?? ""})
            
            if(!testeColaboradores){
                throw new AppError("Supervisor não cadastrado")     
            }
        } 
        
        if(coordenador_id){
            const [testeColaboradores] = await knex("colaboradores").where({id:coordenador_id ?? ""})
            
            if(!testeColaboradores){
                throw new AppError("Coordenador não cadastrado")     
            }
        }


        await knex("equipes").insert({
            equipe, tipo, lider_id, supervisor_id, coordenador_id,contrato
        })
        

        response.status(201).json("Equipe criada");
    }

    async index(request, response) {
        

        response.status(201).json();
    }

    async show(request, response) {
        
        return response.status(200).json({
           
        })
    }

    async update(request, response) {
        
        
        response.status(200).json()
    }
}


module.exports = EquipesController