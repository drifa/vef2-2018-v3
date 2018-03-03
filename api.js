const express = require('express');

const {
  create,
  readAll,
  readOne,
  update,
  del,
} = require('./notes');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res).catch(next);
}

const router = express.Router();

router.get('/', catchErrors(async (req, res) => {
  const result = await readAll(req.params.id);
  if (result.error) {
    res.statusCode = result.code;
    res.json(result.error);
  } else {
    res.json(result);
  }
}));

router.post('/', catchErrors(async (req, res) => {
  const result = await create(req.body);
  if (result.error) {
    res.statusCode = result.code;
    res.json(result.error);
  } else {
    res.json(result);
  }
}));

router.get('/:id', catchErrors(async (req, res) => {
  const result = await readOne(req.params.id);
  if (result.error) {
    res.statusCode = result.code;
    res.json(result.error);
  } else {
    res.json(result);
  }
}));

router.put('/:id', catchErrors(async (req, res) => {
  const result = await update(req.params.id, req.body);
  if (result.error) {
    res.statusCode = result.code;
    res.json(result.error);
  } else {
    res.json(result);
  }
}));

router.delete('/:id', catchErrors(async (req, res) => {
  const result = await del(req.params.id);
  res.statusCode = result;
  res.send('');
}));

module.exports = router;
