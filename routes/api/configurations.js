const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Configuration = require('../../models/Configuration');

//@route    POST api/configuration
//@desc     Set configuration

router.post(
  '/',
  [
    check('financeRate', 'Finance rte is required')
      .not()
      .isEmpty(),
    check('deposit', 'Deposit is required')
      .not()
      .isEmpty(),
    check('timeLimit', 'Time limit is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Configuration.remove();
    const { financeRate, deposit, timeLimit } = req.body;
    try {
      const configuration = Configuration({
        financeRate,
        deposit,
        timeLimit
      });
      await configuration.save();
      res.json(configuration);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/configurations
//@desc     GET configurations

router.get('/', async (req, res) => {
  try {
    const configuration = await Configuration.find();
    res.json(configuration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
