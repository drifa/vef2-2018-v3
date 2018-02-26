const express = require('express');

const {
  create,
  readAll,
  readOne,
  update,
  del,
} = require('./notes');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let result = await readAll();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let result = await readOne(req.params.id);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/* todo útfæra api */

module.exports = router;
