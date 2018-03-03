const {
  runSQL,
} = require('./database');

const {
  validation,
} = require('./validator');

function makeError(error, code) {
  return {
    error,
    code,
  };
}
/**
 * Create a note asynchronously.
 *
 * @param {Object} note - Note to create
 * @param {string} note.title - Title of note
 * @param {string} note.text - Text of note
 * @param {string} note.datetime - Datetime of note
 *
 * @returns {Promise} Promise representing the object result of creating the note
 */
async function create({ title, text, datetime } = {}) {
  if (validation(title, text, datetime).length > 0) {
    return makeError(validation(title, text, datetime), 400);
  }
  const query = 'INSERT INTO Notes(title, text, datetime) VALUES($1, $2, $3::timestamp) returning id;';
  const params = [title, text, datetime];

  try {
    const results = await runSQL(query, params);
    return {
      id: results[0].id,
      title,
      text,
      datetime,
    };
  } catch (error) {
    return makeError({ error: error.message }, 400);
  }
}

/**
 * Read all notes.
 *
 * @returns {Promise} Promise representing an array of all note objects
 */
async function readAll() {
  const query = 'SELECT * FROM Notes;';
  const params = [];
  const results = await runSQL(query, params);
  return results;
}

/**
 * Read a single note.
 *
 * @param {number} id - Id of note
 *
 * @returns {Promise} Promise representing the note object or null if not found
 */
async function readOne(id) {
  if (Number.isNaN(parseInt(id, 10))) {
    return makeError({ error: 'Note not found' }, 404);
  }
  const query = 'SELECT * FROM Notes WHERE id=$1;';
  const params = [id];
  try {
    const results = await runSQL(query, params);
    if (results.length > 0) {
      return results[0];
    }
    return makeError({ error: 'Note not found' }, 404);
  } catch (error) {
    return makeError({ error: error.message }, 400);
  }
}

/**
 * Update a note asynchronously.
 *
 * @param {number} id - Id of note to update
 * @param {Object} note - Note to create
 * @param {string} note.title - Title of note
 * @param {string} note.text - Text of note
 * @param {string} note.datetime - Datetime of note
 *
 * @returns {Promise} Promise representing the object result of creating the note
 */
async function update(id, { title, text, datetime } = {}) {
  if (Number.isNaN(parseInt(id, 10))) {
    return makeError({ error: 'Invalid id' }, 400);
  }
  if (validation(title, text, datetime).length > 0) {
    return makeError(validation(title, text, datetime), 400);
  }
  const query = 'UPDATE Notes SET title = $1, text = $2, datetime = $3::timestamp WHERE id = $4 returning id;';
  const params = [title, text, datetime, id];
  try {
    const results = await runSQL(query, params);
    return {
      id: results[0].id,
      title,
      text,
      datetime,
    };
  } catch (error) {
    return makeError({ error: error.message }, 400);
  }
}

/**
 * Delete a note asynchronously.
 *
 * @param {number} id - Id of note to delete
 *
 * @returns {Promise} Promise representing the boolean result of creating the note
 */
async function del(id) {
  const query = 'DELETE FROM Notes WHERE id=$1;';
  const params = [id];
  try {
    await runSQL(query, params);
    return 200;
  } catch (e) {
    return 404;
  }
}

module.exports = {
  create,
  readAll,
  readOne,
  update,
  del,
};
