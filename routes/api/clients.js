const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Client = require('../../models/Client');

//@route    POST api/client
//@desc     register a client

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('apellidoPaterno', 'Apellido paterno is required')
      .not()
      .isEmpty(),
    check('apellidoMaterno', 'Apellido meterno is required')
      .not()
      .isEmpty(),
    check('RFC', 'RFC is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, apellidoPaterno, apellidoMaterno, RFC } = req.body;
    try {
      const client = Client({
        name,
        apellidoPaterno,
        apellidoMaterno,
        RFC
      });
      await client.save();
      res.json(client);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/clients
//@desc     GET clients

router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/clients
//@desc     Get a client by id

router.get('/client/:client_id', async (req, res) => {
  const id = req.params.client_id;
  try {
    const client = await Client.findById(id);

    if (!client) return res.status(400).json({ msg: 'Client not found' });
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PATCH api/client
//@desc     Update a client

router.patch('/client/:client_id', async (req, res) => {
  const id = req.params.client_id;

  try {
    const client = await Client.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
