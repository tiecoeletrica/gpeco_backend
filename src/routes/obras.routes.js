const { Router } = require("express")

const ObrasController = require("../controllers/ObrasController")

const obrasController = new ObrasController()

const obrasRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
obrasRoutes.use(ensureAuthenticated)

obrasRoutes.post("/", obrasController.create)
obrasRoutes.get("/:id", obrasController.show)
obrasRoutes.put("/:id", obrasController.update)
obrasRoutes.get("/", obrasController.index)

module.exports = obrasRoutes;