const connection = require('./db');

const getMenu = (_, res) => {
    //mando el menu completo
    console.log(connection)
    connection.query('SELECT * FROM platos', (err, result) => {
        if (err) {
            console.error(err);
        }
        else {
            res.status(200).json(result);
        }
    });
}

const getMenuItem = (req, res) => {
    //tomo el valor id del /:id
    const { id } = req.params;

    //busco en el menu el objeto que tenga el id de antes
    connection.query('SELECT * FROM platos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
        }
        //si no existe el item, mando not found
        if (!result[0]) {
            res.status(404).json({ msg: "No se ha encontrado el item" });
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
        res.status(200).json(result);
    });
}

const getPrincipales = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como principal
    connection.query('SELECT * FROM platos WHERE tipo = "principal"', (err, result) => {
        if (err) {
            console.error(err);
        }
        res.status(200).json(result);
    });
}

const getPostres = (_, res) => {
    //busca todos los objetos del menu que tengan el atributo "tipo" como postre
    connection.query('SELECT * FROM platos WHERE tipo = "postre"', (err, result) => {
        if (err) {
            console.error(err);
        }
        res.status(200).json(result);
    });
}

async function postPedido(req, res) {
    //llamo lo que me llego de la request como un array de productos
    const { productos } = req.body;

    //Reviso si el array no esta vacio
    if (!productos || !Array.isArray(productos)) {
        return res.status(400).json({ msg: "La solicitud debe incluir un array de productos." });
    }

    //agarro todas las filas de la tabla platos
    const [rows] = await connection.promise().query('SELECT * FROM platos');
    //meto esas filas en un array pero como solo con el id y el precio
    const menu = rows.map(row => ({
        id: row.id,
        precio: row.precio
    }));

    let precioTotal = 0;
    let idsNoExistentes = [];

    /*
    aca menuItem es un booleano y si el item existe en la base de datos lo agrego, 
    y si no lo meto en otro arrat para items no existentes
    */

    productos.forEach((producto) => {
        let menuItem = menu.find((item) => item.id === producto.id);

        if (menuItem) {
            precioTotal += menuItem.precio * producto.cantidad;
        } else {
            idsNoExistentes.push(producto.id);
        }
    });

    //si el array de items no existentes tiene un objeto que haga return
    if (idsNoExistentes.length > 0) {
        return res.status(400).json({
            msg: "Los siguientes ids no existen en el menú: " + idsNoExistentes.join(", ")
        });
    }
    let pedidoID;
    connection.query('INSERT INTO pedidos (id_usuario, fecha) VALUES (?, ?)', [1, new Date()], (err, response) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Error al crear el pedido",
            });
        }
        pedidoID = response.insertId;
        for (let i = 0; i < productos.length; i++) {
            connection.query('INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES (?, ?, ?)', [pedidoID, productos[i].id, productos[i].cantidad], (err, _) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        return res.status(200).json({ id: pedidoID });
    });
}

const getPedidos = (req, res) => {
    //tomo el valor id del /:id
    const { id } = req.params;

    connection.query('SELECT pedidos.*, platos.id AS id_plato, platos.nombre, platos.precio, pedidos_platos.cantidad FROM pedidos JOIN pedidos_platos ON pedidos_platos.id_pedido = pedidos.id JOIN platos ON pedidos_platos.id_plato = platos.id WHERE pedidos.id_usuario = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Error al buscar los pedidos" });
        }
        if (!result || result.length === 0) {
            return res.status(404).json({ msg: "No se ha encontrado el pedido" });
        }
        const pedidos = result.reduce((acc, row) => {
            const pedido = acc.find(p => p.id === row.id);
            if (!pedido) {
                acc.push({
                    id: row.id,
                    fecha: row.fecha,
                    estado: row.estado,
                    id_usuario: row.id,
                    platos: [],
                });
            }
            const platos = {
                id: row.id_plato,
                nombre: row.nombre,
                precio: row.precio,
                cantidad: row.cantidad,
            };
            const index = acc.findIndex((p) => p.id === row.id);
            acc[index].platos.push(platos);
            return acc;
        }, []);
        return res.status(200).json(pedidos);
    });
};
//exporto todas las funciones para poder llamarlas desde el router.js
module.exports = { getMenu, getCombos, getMenuItem, getPostres, getPrincipales, postPedido, getPedidos };