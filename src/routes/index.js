//importa o Router do express
const { Router } = require("express");

//rota para a rota do usuário
const  atutenticacaoRoutes  = require("./autenticacao.routes");
const  colaboradoresRouter  = require("./colaboradores.routes");
const  equipesRouter = require("./equipes.routes")
const  obrasRouter = require("./obras.routes")
const  obras_turnosRouter = require("./obras_turnos.routes")
const  programacoesRouter = require("./programacoes.routes")
const  servicosRouter = require("./servicos.routes")
const  turnosRouter = require("./turnos.routes")
const  veiculosRouter = require("./veiculos.routes")

//insere a constante em um "app", nesse caso routes
const routes = Router();

//fala pra o aplicativo usar o arquivo users.routes.js pra acessar os métodos
routes.use("/auth", atutenticacaoRoutes);
routes.use("/colaboradores", colaboradoresRouter);
routes.use("/equipes", equipesRouter);
routes.use("/obras", obrasRouter);
routes.use("/obras_turnos", obras_turnosRouter);
routes.use("/programacoes", programacoesRouter);
routes.use("/servicos", servicosRouter);
routes.use("/turnos", turnosRouter);
routes.use("/veiculos", veiculosRouter);

// exporta as rotas
module.exports = routes;