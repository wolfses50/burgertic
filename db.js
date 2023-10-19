const mysql2 = require('mysql2'); 

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'burgertic'
  });

  connection.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Connected to database`);
    }
  });

module.exports = connection;