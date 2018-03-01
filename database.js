require('dotenv').config();
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL// + '?ssh=true';

exports.runSQL = async(queryString, params, callback) => {
  const client = new Client({ connectionString });

  const query = {
    text: queryString,
    values: params,
  };

  await client.connect();
  client.query(query, (err, res) => {
    callback(err, res)
    await client.end();
  });
}
