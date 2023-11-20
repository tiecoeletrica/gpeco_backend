const { Router } = require("express")

const ProgramacoesController = require("../controllers/ProgramacoesController")

const programacoesController = new ProgramacoesController()

const programacoesRoutes = Router()

programacoesRoutes.post("/", programacoesController.create)
programacoesRoutes.get("/:id", programacoesController.show)
programacoesRoutes.delete("/:id", programacoesController.delete)
programacoesRoutes.get("/", programacoesController.index)
programacoesRoutes.put("/:id", programacoesController.update)

module.exports = programacoesRoutes;