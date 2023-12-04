const { Router } = require("express")

const AutenticacaoController = require("../controllers/AutenticacaoController")

const autenticacaoController = new AutenticacaoController()

const autenticacaoRoutes = Router()

autenticacaoRoutes.post("/", autenticacaoController.create)


module.exports = autenticacaoRoutes;