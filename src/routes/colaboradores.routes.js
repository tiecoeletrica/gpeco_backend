const { Router } = require("express")

const ColaboadoresController = require("../controllers/ColaboradoresController")

const colaboadoresController = new ColaboadoresController()

const colaboadoresRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
colaboadoresRoutes.use(ensureAuthenticated)

colaboadoresRoutes.post("/", colaboadoresController.create)
colaboadoresRoutes.get("/:id", colaboadoresController.show)
colaboadoresRoutes.put("/:id", colaboadoresController.update)
colaboadoresRoutes.get("/", colaboadoresController.index)

module.exports = colaboadoresRoutes;