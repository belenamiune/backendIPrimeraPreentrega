const { getProductsData, saveProductsData } = require('../utils/fileHelper');
const PRODUCTS_FILE = '../data/products.json';

let products = getProductsData(PRODUCTS_FILE);

const ProductModel = {
    getAll: () => products,

    getById: (id) => products.find(product => product.id === id),

    create: (data) => {
        const newProduct = {
            id: Date.now().toString(),
            ...data,
            status: data.status !== undefined ? data.status : true,
        };

        products.push(newProduct);
        saveProductsData(PRODUCTS_FILE, products);
        return newProduct;
    },

    update: (id, data) => {
        const product = products.find(product => product.id === id);
        if (!product) return null;

        Object.assign(product, data);
        saveProductsData(PRODUCTS_FILE, products);
        return product;
    },

    delete: (id) => {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return false;

        products.splice(index, 1);
        saveProductsData(PRODUCTS_FILE, products);
        return true;
    }
};

module.exports = ProductModel;
