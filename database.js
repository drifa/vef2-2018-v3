require('dotenv').config();
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL// + '?ssh=true';

exports.runSQL = async(queryString, params) => {
  const client = new Client({ connectionString });

  const query = {
    text: queryString,
    values: params,
  };

  await client.connect();
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }
}
