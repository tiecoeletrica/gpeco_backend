const { Router } = require("express")

const Checklists_aprController = require("../controllers/Checklists_aprController")

const checklists_APRController = new Checklists_aprController()

const checklists_aprRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")
checklists_aprRoutes.use(ensureAuthenticated)

checklists_aprRoutes.post("/", checklists_APRController.create)
checklists_aprRoutes.get("/:id/:tipo", checklists_APRController.show)
checklists_aprRoutes.get("/", checklists_APRController.index)

module.exports = checklists_aprRoutes;