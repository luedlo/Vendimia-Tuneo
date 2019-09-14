const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Product = require('../../models/Product');

//@route    POST api/products
//@desc     Create a product

router.post(
  '/',
  [
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('model', 'Model is required')
      .not()
      .isEmpty(),
    check('cost', 'Cost is required')
      .not()
      .isEmpty(),
    check('stock', 'Stock is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { description, model, cost, stock } = req.body;
    try {
      const product = Product({
        description,
        model,
        cost,
        stock
      });
      await product.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/products
//@desc     GET products

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/products
//@desc     Get a product by id

router.get('/product/:product_id', async (req, res) => {
  const id = req.params.product_id;
  try {
    const product = await Product.findById(id);

    if (!product) return res.status(400).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PATCH api/products
//@desc     Update a product

router.patch('/product/:product_id', async (req, res) => {
  const id = req.params.product_id;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
