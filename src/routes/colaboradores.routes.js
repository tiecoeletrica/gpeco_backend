const { Router } = require("express")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const ColaboadoresController = require("../controllers/ColaboradoresController")

const colaboadoresController = new ColaboadoresController()

const colaboadoresRoutes = Router()

colaboadoresRoutes.post("/", ensureAuthenticated, colaboadoresController.create)
colaboadoresRoutes.get("/:id", ensureAuthenticated, colaboadoresController.show)
colaboadoresRoutes.put("/:id", ensureAuthenticated, colaboadoresController.update)
colaboadoresRoutes.get("/", ensureAuthenticated, colaboadoresController.index)

module.exports = colaboadoresRoutes;