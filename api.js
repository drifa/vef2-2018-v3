const express = require('express');
const db = require('./createdb');

db.query("INSERT INTO Notes(datetime, title, text) VALUES(CURRENT_TIMESTAMP, 'Yo', 'What's kicking')");

const {
  create,
  readAll,
  readOne,
  update,
  del,
} = require('./notes');

const router = express.Router();

router.get('/', async (req, res) => {
  let result = await db.query('SELECT * FROM Notes;')
  res.send('' + result);
});

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/* todo útfæra api */

module.exports = router;
