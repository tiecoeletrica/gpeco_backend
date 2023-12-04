const { Router } = require("express")

const VeiculosController = require("../controllers/VeiculosController")

const veiculosController = new VeiculosController()

const veiculosRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
veiculosRoutes.use(ensureAuthenticated)

veiculosRoutes.post("/", veiculosController.create)
veiculosRoutes.get("/:id", veiculosController.show)
veiculosRoutes.put("/:id", veiculosController.update)
veiculosRoutes.get("/", veiculosController.index)

module.exports = veiculosRoutes;