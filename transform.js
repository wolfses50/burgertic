const mysql = require('mysql2');
const fs = require('fs');

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'burgertic'
});

// read the menu.json file and parse it into a JavaScript object
const menuData = fs.readFileSync('./menu.json');
const platos = JSON.parse(menuData);

// loop through the menu array and insert each object into the menu table
platos.forEach(item => {
  const { id, nombre, precio, tipo, descripcion } = item;
  connection.query(
    `INSERT INTO platos (id, nombre, precio, descripcion, tipo) VALUES (${id}, '${nombre}', ${precio}, '${descripcion}', '${tipo}')`,
    (err, _) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Inserted item with ID ${id}`);
      }
    }
  );
});