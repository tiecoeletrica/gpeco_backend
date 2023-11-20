const { Router } = require("express")

const EquipesController = require("../controllers/EquipesController")

const equipesController = new EquipesController()

const equipesRoutes = Router()

equipesRoutes.post("/", equipesController.create)
equipesRoutes.get("/:id", equipesController.show)
equipesRoutes.put("/:id", equipesController.update)
equipesRoutes.get("/", equipesController.index)

module.exports = equipesRoutes;