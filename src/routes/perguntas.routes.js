const { Router } = require("express")

const PerguntasController = require("../controllers/PerguntasController")

const perguntasController = new PerguntasController()

const perguntasRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
perguntasRoutes.use(ensureAuthenticated)

perguntasRoutes.post("/", perguntasController.create)
perguntasRoutes.put("/:id", perguntasController.update)
perguntasRoutes.get("/", perguntasController.index)

module.exports = perguntasRoutes;