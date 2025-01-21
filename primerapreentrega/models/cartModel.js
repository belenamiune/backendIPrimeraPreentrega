const { getProductsData, saveProductsData } = require('../utils/fileHelper');
const CARTS_FILE = './data/cart.json';

// Cargar los carritos desde el archivo
let carts = getProductsData(CARTS_FILE);

const CartModel = {
    // Obtener todos los carritos
    getAll: () => carts,

    // Obtener un carrito por ID
    getById: (id) => carts.find(cart => cart.id === id),

    // Crear un nuevo carrito
    create: () => {
        const newCart = {
            id: Date.now().toString(), // Generar un ID único
            products: [] // Lista inicial vacía
        };

        carts.push(newCart);
        saveProductsData(CARTS_FILE, carts);
        return newCart;
    },

    // Agregar un producto al carrito
    addProduct: (cartId, productId) => {
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) return null;

        const existingProduct = cart.products.find(p => p.product === productId);

        if (existingProduct) {
            // Incrementar la cantidad si ya existe
            existingProduct.quantity += 1;
        } else {
            // Agregar un nuevo producto con cantidad inicial de 1
            cart.products.push({ product: productId, quantity: 1 });
        }

        saveProductsData(CARTS_FILE, carts);
        return cart;
    }
};

module.exports = CartModel;
