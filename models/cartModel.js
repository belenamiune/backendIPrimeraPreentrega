const { getProductsData, saveProductsData } = require('../utils/fileHelper');
const CARTS_FILE = './data/cart.json';


let carts = getProductsData(CARTS_FILE);

const CartModel = {
    getAll: () => carts,

    getById: (id) => carts.find(cart => cart.id === id),

    create: () => {
        const newCart = {
            id: Date.now().toString(),
            products: []
        };

        carts.push(newCart);
        saveProductsData(CARTS_FILE, carts);
        return newCart;
    },

    addProduct: (cartId, productId) => {
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) return null;

        const existingProduct = cart.products.find(p => p.product === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        saveProductsData(CARTS_FILE, carts);
        return cart;
    }
};

module.exports = CartModel;
