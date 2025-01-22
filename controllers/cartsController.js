const fs = require('fs');
const path = require('path');


const cartsFile = path.join(__dirname, '../data/cart.json');


const readCartsFromFile = () => {
  try {
    const data = fs.readFileSync(cartsFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};


const writeCartsToFile = (carts) => {
  fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
};


const createCart = (req, res) => {
  const carts = readCartsFromFile();

  const newCart = {
    id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
    products: []
  };

  carts.push(newCart);
  writeCartsToFile(carts);

  res.status(201).json(newCart);
};


const getCartById = (req, res) => {
  const { cid } = req.params;
  const carts = readCartsFromFile();

  const cart = carts.find((cart) => cart.id === parseInt(cid));

  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  res.json(cart);
};


const addProductToCart = (req, res) => {
  const { cid, pid } = req.params;
  const carts = readCartsFromFile();

  const cart = carts.find((cart) => cart.id === parseInt(cid));

  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }


  const productIndex = cart.products.findIndex((item) => item.product === parseInt(pid));

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += 1;
  } else {
    cart.products.push({ product: parseInt(pid), quantity: 1 });
  }

  writeCartsToFile(carts);

  res.status(200).json(cart);
};


module.exports = {
  createCart,
  getCartById,
  addProductToCart
};
