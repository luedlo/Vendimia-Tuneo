const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Client = require('../../models/Sales');

//@route    POST api/sale
//@desc     register a sale

router.post(
  '/',
  [
    check('clientId', 'clientIdis required')
      .not()
      .isEmpty(),
    check('clientName', 'Client name is required')
      .not()
      .isEmpty(),
    check('total', 'Total is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { clientId, clientName, total } = req.body;

    date = new Date().toLocaleDateString();
    try {
      const sale = Sales({
        clientId,
        clientName,
        total,
        date
      });
      await sale.save();
      res.json(sale);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/sales
//@desc     GET sales

router.get('/', async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
