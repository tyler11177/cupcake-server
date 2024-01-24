const express = require('express');
const CupcakeService = require('../services/cupcake');
const router = new express.Router();
const cupcakeService = new CupcakeService();
/**
 * Add a new cupcake to the store
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await cupcakeService.addCupcake(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Returns a list of available cupcakes
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await cupcakeService.listCupcakes(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Returns a single cupcake
 */
router.get('/:cupcakeId', async (req, res, next) => {
  const options = {
    cupcakeId: req.params['cupcakeId']
  };

  try {
    const result = await cupcakeService.getCupcakeById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update an existing cupcake
 */
router.put('/:cupcakeId', async (req, res, next) => {
  const options = {
    cupcakeId: req.params['cupcakeId'],
    body: req.body['body']
  };

  try {
    const result = await cupcakeService.updateCupcake(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Deletes a cupcake
 */
router.delete('/:cupcakeId', async (req, res, next) => {
  const options = {
    cupcakeId: req.params['cupcakeId']
  };

  try {
    const result = await cupcakeService.deleteCupcake(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
