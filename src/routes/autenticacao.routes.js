const { Router } = require("express")

const AtutenticacaoController = require("../controllers/AutenticacaoController")

const atutenticacaoController = new AtutenticacaoController()

const atutenticacaoRoutes = Router()

atutenticacaoRoutes.post("/", atutenticacaoController.create)


module.exports = atutenticacaoRoutes;