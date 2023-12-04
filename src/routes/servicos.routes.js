const { Router } = require("express")

const ServicosController = require("../controllers/ServicosController")

const servicosController = new ServicosController()

const servicosRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
servicosRoutes.use(ensureAuthenticated)

servicosRoutes.post("/", servicosController.create)
servicosRoutes.get("/:id", servicosController.show)
servicosRoutes.put("/:id", servicosController.update)
servicosRoutes.get("/", servicosController.index)

module.exports = servicosRoutes;