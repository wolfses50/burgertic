const express = require('express');

const router = require('./router');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(router);
app.use(cors());
const port = 9000;

app.listen(port, () => { console.log(`Server running on port ${port}`); });