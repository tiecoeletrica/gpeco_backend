const { Router } = require("express")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const SolicitacoesController = require("../controllers/SolicitacoesController")

const solicitacoesController = new SolicitacoesController()

const solicitacoesRoutes = Router()

solicitacoesRoutes.post("/", solicitacoesController.create)
solicitacoesRoutes.get("/", solicitacoesController.index)
solicitacoesRoutes.delete("/:id",ensureAuthenticated, solicitacoesController.delete)


module.exports = solicitacoesRoutes;