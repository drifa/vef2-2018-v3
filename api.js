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
    res.send("ERROR: " + err);
  }
});

router.get('/:id', (req, res) => {
  readOne(req.params.id, function (res, err) {
    res.send(res);
  })
    // readOne(req.params.id).then(result => {
    //   res.send(result);
    // }).catch(err => {
    //   res.send(err);
    // });
});

router.post('/', async (req, res) => {

});

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/* todo útfæra api */

module.exports = router;
