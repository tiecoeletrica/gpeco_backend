const { Router } = require("express")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const TurnosController = require("../controllers/TurnosController")

const turnosController = new TurnosController()

const turnosRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
turnosRoutes.use(ensureAuthenticated)

turnosRoutes.post("/", turnosController.create)
turnosRoutes.get("/:id", turnosController.show)
turnosRoutes.delete("/:id", turnosController.delete)
turnosRoutes.put("/:id", turnosController.update)
turnosRoutes.get("/", turnosController.index)

module.exports = turnosRoutes;