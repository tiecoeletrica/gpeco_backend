const { Router } = require("express")

const Obras_TurnosController = require("../controllers/Obras_TurnosController")

const obras_TurnosController = new Obras_TurnosController()

const obras_TurnosRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
obras_TurnosRoutes.use(ensureAuthenticated)

obras_TurnosRoutes.post("/", obras_TurnosController.create)
obras_TurnosRoutes.delete("/:id", obras_TurnosController.delete)
obras_TurnosRoutes.put("/:id", obras_TurnosController.update)

module.exports = obras_TurnosRoutes;