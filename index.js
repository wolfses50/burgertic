const express = require('express');

const router = require('./router');

const mysql = require('mysql2');

const app = express();
const cors = require("cors");
app.use(cors());
const port = 9000;
app.use(express.json());
app.use(router);

app.listen(port, () => { console.log(`Server running on port ${port}`); });