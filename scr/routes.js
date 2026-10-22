const express = require('express');
const router = express.Router();

// Importação dos dois controladores mapeados
const usuarioController = require('./controllers/usuario');
const eventoController = require('./controllers/eventos');

// 👤 CRUD COMPLETO: Usuários
router.post('/usuarios', usuarioController.cadastrar);
router.get('/usuarios', usuarioController.listar);
router.put('/usuarios/:id', usuarioController.atualizar);
router.delete('/usuarios/:id', usuarioController.excluir);

// 📅 CRUD COMPLETO: Eventos
router.post('/eventos', eventoController.cadastrar);
router.get('/eventos', eventoController.listar);
router.put('/eventos/:id', eventoController.atualizar);
router.delete('/eventos/:id', eventoController.excluir);

module.exports = router;
