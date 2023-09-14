const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/menu', controllers.getMenu);
router.get('/menu/:id', controllers.getMenuItem);
router.get('/combos', controllers.getCombos);
router.get('/principales', controllers.getPrincipales);
router.get('/postres', controllers.getPostres);
router.post('/pedido', controllers.postPedido);

module.exports = router;