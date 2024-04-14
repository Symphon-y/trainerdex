import { pool } from '../index.js';

export const createServer = async (serverId) => {
  const client = await pool.connect();
  try {
    // Check if the server already exists in the database
    const checkQuery = `SELECT * FROM discord_servers WHERE discord_server_id = $1`;
    const checkResult = await client.query(checkQuery, [serverId]);

    // If the server already exists, return its data
    if (checkResult.rows.length > 0) {
      console.log(checkResult.rows[0]);
      return checkResult.rows[0];
    }

    // If the server doesn't exist, insert it into the database
    const insertQuery = `INSERT INTO discord_servers (discord_server_id)
                         VALUES ($1)
                         RETURNING *;`;
    const insertResult = await client.query(insertQuery, [serverId]);
    console.log(insertResult.rows[0]);
    return insertResult.rows[0];
  } catch (error) {
    console.error('Error adding server to the database:', error);
    throw error;
  } finally {
    client.release();
  }
};
