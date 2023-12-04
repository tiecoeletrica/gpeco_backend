const { Router } = require("express")

const LancamentosController = require("../controllers/LancamentosController")

const lancamentosController = new LancamentosController()

const lancamentosRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
lancamentosRoutes.use(ensureAuthenticated)

lancamentosRoutes.post("/", lancamentosController.create)
lancamentosRoutes.delete("/:id", lancamentosController.delete)
lancamentosRoutes.put("/:id", lancamentosController.update)

module.exports = lancamentosRoutes;