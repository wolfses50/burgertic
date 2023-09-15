const menu = require('./menu.json');

const getMenu = (_, res) => {
    res.status(200).json({
        menu
    });
}

const getMenuItem = (req, res) => {
    const { id } = req.params;
    const item = menu.find(where => where.id == id);
    if (!item) {
        res.status(404).json({
            msg: "No se ha encontrado el item"
        });
        return;
    }
    res.status(200).json({
        item
    });
}

const getCombos = (_, res) => {
    const combos = menu.filter(where => where.tipo == "combo");
    res.status(200).json({
        combos
    });
}

const getPrincipales = (_, res) => {
    const principales = menu.filter(where => where.tipo == "principal");
    res.status(200).json({
        principales
    });
}

const getPostres = (_, res) => {
    const postres = menu.filter(where => where.tipo == "postre")
    res.status(200).json({
        postres
    });
}

const postPedido = (req, res) => {
    const { productos } = req.body;
    const ids = productos.map(plato => plato.id);
    const idMenu = menu.map(plato => plato.id);
    const idNoExistente = ids.filter(id => !idMenu.includes(id));
    if (idNoExistente.length > 0) {
        res.status(404).json({
            msg: `Los siguientes id's no existen: ${idsNoExistentes.join(", ")}`
        });
        return;
    }
    const pedido = productos.map(plato => menu.find(where => where.id == plato.id));
    const total = pedido.reduce((acc, plato) => acc + plato.precio, 0);

    res.status(200).json({
        msg: "Pedido realizado con éxito",
        total
    });
}

module.exports = { getMenu, getCombos, getMenuItem, getPostres, getPrincipales, postPedido }