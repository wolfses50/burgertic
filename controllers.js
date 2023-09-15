const menu = require('./menu.json');

const getMenu = (_, res) => {
    //mando el menu completo
    res.status(200).json({
        menu
    });
}

const getMenuItem = (req, res) => {
    //tomo el valor id del /:id
    const { id } = req.params;

    //busco en el menu el objeto que tenga el id de antes
    const item = menu.find(where => where.id == id);

    //si no existe el item, mando not found
    if (!item) {
        res.status(404).json({
            msg: "No se ha encontrado el item"
        });
        return;
    }

    //si existe, mando el item
    res.status(200).json({
        item
    });
}

const getCombos = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como combo
    const combos = menu.filter(where => where.tipo == "combo");
    res.status(200).json({
        combos
    });
}

const getPrincipales = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como principal
    const principales = menu.filter(where => where.tipo == "principal");
    res.status(200).json({
        principales
    });
}

const getPostres = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como postre
    const postres = menu.filter(where => where.tipo == "postre")
    res.status(200).json({
        postres
    });
}

const postPedido = (req, res) => {
    const { productos } = req.body;
    const ids = productos.map(plato => plato.id);
    const idMenu = menu.map(plato => plato.id);

    /*Aca agarro los id de los productos que me mandaron y los comparo con 
    los id del menu pre-existente para saber si existen de verdad*/

    const idNoExistente = ids.filter(id => !idMenu.includes(id));
    if (idNoExistente.length > 0) {
        res.status(404).json({
            msg: `Los siguientes id's no existen: ${idNoExistente.join(", ")}`
        });
        return;
    }
    const pedido = productos.map(plato => menu.find(where => where.id == plato.id));
    const total = pedido.reduce((acc, plato) => acc + plato.precio, 0);

    /*suma los precios de los platos, acc siendo acumulacion, plato el plato que se esta 
    agarrando en el momento y 0 es el valor inicial de acc */

    res.status(200).json({
        msg: "Pedido realizado con éxito",
        total
    });
}

//exporto todas las funciones para poder llamarlas desde el router.js
module.exports = { getMenu, getCombos, getMenuItem, getPostres, getPrincipales, postPedido }