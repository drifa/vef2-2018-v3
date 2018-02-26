const express = require('express');
const db = require('./createdb');

const {
  create,
  readAll,
  readOne,
  update,
  del,
} = require('./notes');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('HELLO WORLD')
  try {
    await db.query("INSERT INTO Notes(datetime, title, text) VALUES(CURRENT_TIMESTAMP, 'Yo', 'What's kicking')");
    let result = await db.query('SELECT * FROM Notes;')
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
