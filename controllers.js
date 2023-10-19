const mysql = require('mysql2');

const connection = require('./db');
const nodemon = require('nodemon');

const getMenu = (_, res) => {
    //mando el menu completo
    console.log(connection)
    connection.query('SELECT * FROM platos', (err, result) => {
        if (err) {
            console.error(err);
        }
        else {
    res.status(200).json({ result });
        }
    });
}

const getMenuItem = (req, res) => {
    //tomo el valor id del /:id
    const { id } = req.params;

    //busco en el menu el objeto que tenga el id de antes
    connection.query('SELECT * FROM platos WHERE id = ?' ,[id], (err, result) => {
        if (err) {
            console.error(err);
        }
        //si no existe el item, mando not found
        if (!result[0]) {
            res.status(404).json({
                msg: "No se ha encontrado el item"
            });
            return;
        }
    //si existe, mando el item
    res.status(200).json(result[0]);
    });
}

const getCombos = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como combo
    connection.query('SELECT * FROM platos WHERE tipo = "combo"', (err, result) => {
        if (err) {
            console.error(err);
        }
    res.status(200).json({
        result
    });
});
}

const getPrincipales = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como principal
    connection.query('SELECT * FROM platos WHERE tipo = "principal"', (err, result) => {
        if (err) {
            console.error(err);
        }
    res.status(200).json({
        result
    });
});
}

const getPostres = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como postre
    connection.query('SELECT * FROM platos WHERE tipo = "postre"', (err, result) => {
        if (err) {
            console.error(err);
        }
    res.status(200).json({
        result
    });
    });
}


async function postPedido(req, res) {
    const [rows] = await connection.query('SELECT * FROM platos');
    const menu = rows.map(row => ({
    id: row.id,
    precio: row.precio
}));


    const { productos } = req.body;
    const ids = productos.map(plato => plato.id);

    const idMenu = menu.map(plato => plato.id);

    if (!productos) {
        res.status(400).json({
            msg: "El pedido debe tener productos"
        });
        return;
    }

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