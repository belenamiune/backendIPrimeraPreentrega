const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

const app = express();

app.use(bodyParser.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

module.exports = app;
