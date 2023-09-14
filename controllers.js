const menu = require('./menu.json');

const getMenu = (_, res) => {
    res.json({
        menu 
    });
}

const getMenuItem = (req, res) => {
    const { id } = req.params;
    const menuItem = menu.find(item => item.id === id);
    res.json({
        menuItem
    });
}

const getCombos = (_, res) => {
    const combos = menu.filter(item => item.combo);
    res.json({
        combos
    });
}

const getPrincipales = (_, res) => {
    const principales = menu.filter(item => item.principal);
    res.json({
        principales
    });
}

const getPostres = (_, res) => {
    const postres = menu.filter(item => item.postre)
    res.json({
        postres
    });
}

const postPedido = (req, res) => {
    const pedido = req.productos.length
    const platos = [];
    for (let i; i < pedido; i++){
    platos.push(productos[i]);
    }
    res.json(platos);
}

module.exports = { getMenu, getCombos, getMenuItem, getPostres, getPrincipales, postPedido }