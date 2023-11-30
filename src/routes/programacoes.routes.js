const { Router } = require("express")

const ProgramacoesController = require("../controllers/ProgramacoesController")

const programacoesController = new ProgramacoesController()

const programacoesRoutes = Router()

programacoesRoutes.post("/", programacoesController.create)
programacoesRoutes.get("/", programacoesController.index)

module.exports = programacoesRoutes;