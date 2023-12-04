const { Router } = require("express")

const SolicitacoesController = require("../controllers/SolicitacoesController")

const solicitacoesController = new SolicitacoesController()

const solicitacoesRoutes = Router()

solicitacoesRoutes.post("/", solicitacoesController.create)
solicitacoesRoutes.delete("/:id", solicitacoesController.delete)


module.exports = solicitacoesRoutes;