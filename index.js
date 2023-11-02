const express = require('express');

const router = require('./router');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(router);
const port = 9000;

app.listen(port, () => { console.log(`Server running on port ${port}`); });