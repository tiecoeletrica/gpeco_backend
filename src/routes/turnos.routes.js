const { Router } = require("express")

const TurnosController = require("../controllers/TurnosController")

const turnosController = new TurnosController()

const turnosRoutes = Router()

turnosRoutes.post("/:user_id", turnosController.create)
turnosRoutes.get("/:id", turnosController.show)
turnosRoutes.delete("/:id", turnosController.delete)
turnosRoutes.put("/:id", turnosController.update)
turnosRoutes.get("/", turnosController.index)

module.exports = turnosRoutes;