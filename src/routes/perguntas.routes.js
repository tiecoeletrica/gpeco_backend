const { Router } = require("express")

const PerguntasController = require("../controllers/PerguntasController")

const perguntasController = new PerguntasController()

const perguntasRoutes = Router()

perguntasRoutes.post("/", perguntasController.create)
perguntasRoutes.put("/:id", perguntasController.update)
perguntasRoutes.get("/", perguntasController.index)

module.exports = perguntasRoutes;