require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

exports.runSQL = async(query, params) => {
  const client = new Client({ connectionString });

  await client.connect();

  try {
    const result = await client.query(q, params);

    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error running query');
    throw err;
  } finally {
    await client.end();
  }
}
