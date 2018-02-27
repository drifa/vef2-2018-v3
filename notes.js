const db = require('./database');

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
  const query = 'INSERT INTO Notes(datetime, title, text) VALUES($1::timestamp, $2::string, $3::string);';
  const params = [ datetime, title, text ];
  let results = await db.runSQL(query, params);
  return results;
}

/**
 * Read all notes.
 *
 * @returns {Promise} Promise representing an array of all note objects
 */
async function readAll() {
  return connectionString;
  const query = 'SELECT * FROM Notes;';
  const params = [];
  let results = await db.runSQL(query, params);
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
  const query = 'SELECT * FROM Notes WHERE id=$1::serial;';
  const params = [ id ];
  let results = await db.runSQL(query, params);
  return results;
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
  /* todo útfæra */
}

/**
 * Delete a note asynchronously.
 *
 * @param {number} id - Id of note to delete
 *
 * @returns {Promise} Promise representing the boolean result of creating the note
 */
async function del(id) {
  /* todo útfæra */
}

module.exports = {
  create,
  readAll,
  readOne,
  update,
  del,
};
