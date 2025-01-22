const { getProductsData, saveProductsData } = require('../utils/fileHelper');
const PRODUCTS_FILE = './data/products.json';

let products = getProductsData(PRODUCTS_FILE);

const getProducts = (req, res) => {
    const { limit } = req.query;
    const result = limit ? products.slice(0, parseInt(limit)) : products;
    res.json(result);
};

const getProductById = (req, res) => {
    const product = products.find(p => p.id === req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
};

const createProduct = (req, res) => {
    const { title, description, code, price, stock, category, thumbnails = [], status = true } = req.body;

    if (!title || !description || !code || price == null || stock == null || !category) {
        return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    }

    const newProduct = { id: Date.now().toString(), title, description, code, price, stock, category, thumbnails, status };
    products.push(newProduct);
    saveProductsData(PRODUCTS_FILE, products);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const product = products.find(p => p.id === req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    Object.assign(product, req.body);
    saveProductsData(PRODUCTS_FILE, products);
    res.json(product);
};

const deleteProduct = (req, res) => {
    products = products.filter(p => p.id !== req.params.pid);
    saveProductsData(PRODUCTS_FILE, products);
    res.status(204).send();
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
