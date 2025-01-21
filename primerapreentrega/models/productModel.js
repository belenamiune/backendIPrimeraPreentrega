const { getProductsData, saveProductsData } = require('../utils/fileHelper');
const PRODUCTS_FILE = './data/products.json';

// Cargar los productos desde el archivo
let products = getProductsData(PRODUCTS_FILE);

const ProductModel = {
    // Obtener todos los productos
    getAll: () => products,

    // Obtener un producto por ID
    getById: (id) => products.find(product => product.id === id),

    // Crear un nuevo producto
    create: (data) => {
        const newProduct = {
            id: Date.now().toString(), // Generar un ID único
            ...data,
            status: data.status !== undefined ? data.status : true, // Status por defecto true
        };

        products.push(newProduct);
        saveProductsData(PRODUCTS_FILE, products);
        return newProduct;
    },

    // Actualizar un producto existente
    update: (id, data) => {
        const product = products.find(product => product.id === id);
        if (!product) return null;

        Object.assign(product, data);
        saveProductsData(PRODUCTS_FILE, products);
        return product;
    },

    // Eliminar un producto por ID
    delete: (id) => {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return false;

        products.splice(index, 1);
        saveProductsData(PRODUCTS_FILE, products);
        return true;
    }
};

module.exports = ProductModel;
