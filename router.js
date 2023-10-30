const express = require('express');

const controllers = require('./controllers');

const router = express.Router();

/*llamo las rutas con las funciones del controllers.js
en vez de escribirlas todas aca*/
router.get('/menu', controllers.getMenu);
router.get('/menu/:id', controllers.getMenuItem);
router.get('/combos', controllers.getCombos);
router.get('/principales', controllers.getPrincipales);
router.get('/postres', controllers.getPostres);
router.post('/pedido', controllers.postPedido);
router.get('/pedidos/:id', controllers.getPedidos);

module.exports = router;