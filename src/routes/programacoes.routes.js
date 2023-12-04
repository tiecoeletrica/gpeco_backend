const { Router } = require("express")

const ProgramacoesController = require("../controllers/ProgramacoesController")

const programacoesController = new ProgramacoesController()

const programacoesRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
programacoesRoutes.use(ensureAuthenticated)

programacoesRoutes.post("/", programacoesController.create)
programacoesRoutes.get("/", programacoesController.index)

module.exports = programacoesRoutes;