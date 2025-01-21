const express = require('express');
const { getCartById, createCart, addProductToCart } = require('../controllers/cartsController');

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);

module.exports = router;
