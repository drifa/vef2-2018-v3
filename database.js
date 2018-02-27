require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

exports.runSQL = async(query, params) => {
  const client = new Client({ connectionString });

  await client.connect();
  try {
    const result = await client.query(query, params);
    const { rows } = result;
    await client.end();
    return rows;
  } catch (err) {
    await client.end();
    throw err;
  }
}
