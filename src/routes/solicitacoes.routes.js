const { Router } = require("express")

const SolicitacoesController = require("../controllers/SolicitacoesController")

const solicitacoesController = new SolicitacoesController()

const solicitacoesRoutes = Router()

solicitacoesRoutes.post("/", solicitacoesController.create)


module.exports = solicitacoesRoutes;