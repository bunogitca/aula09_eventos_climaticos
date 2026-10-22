const express = require("express")
const routes = express.Router()

const Usuario = require("./controllers/usuario") 
const Evento = require('../scr/controllers/eventos');

routes.post("/usuarios", Usuario.cadastrar)
routes.get("/usuarios", Usuario.listar)

routes.post("/eventos", Evento.cadastrar)
routes.get("/eventos", Evento.listar)



module.exports = routes
