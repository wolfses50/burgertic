const menu = require('./menu.json');

const getMenu = (_, res) => {
    res.json({
        menu
    });
}

const getMenuItem = (req, res) => {
    const { id } = req.params;
    const item = menu.find(where => where.id == id);
    res.json({
        item
    });
}

const getCombos = (_, res) => {
    const combos = menu.filter(where => where.tipo == "combo");
    res.json({
        combos
    });
}

const getPrincipales = (_, res) => {
    const principales = menu.filter(where => where.tipo == "principal");
    res.json({
        principales
    });
}

const getPostres = (_, res) => {
    const postres = menu.filter(where => where.tipo == "postre")
    res.json({
        postres
    });
}

const postPedido = (req, res) => {
    const pedido = req.productos.length
    const platos = [];
    for (let i; i < pedido; i++) {
        platos.push(productos[i]);
    }
    res.json(platos);
}

module.exports = { getMenu, getCombos, getMenuItem, getPostres, getPrincipales, postPedido }