import { pool } from '../index.js';

export const getUserById = async ({ userId, discordServerId }) => {
  const client = await pool.connect();
  console.log({ userId, discordServerId });
  try {
    const query =
      'SELECT * FROM users WHERE discord_id = $1 AND discord_server_id = $2::VARCHAR';
    const result = await client.query(query, [userId, discordServerId]);

    return result.rows[0];
  } catch (error) {
    console.error('Error retrieving user from the database:', error);
  } finally {
    client.release();
  }
};

export const getUserByUsername = async ({ userName, discordServerId }) => {
  const client = await pool.connect();
  console.log('db repository');
  console.log(userName);
  console.log(discordServerId);
  try {
    const query =
      'SELECT * FROM users WHERE discord_name = $1 AND discord_server_id = $2::VARCHAR';

    const result = await client.query(query, [userName, discordServerId]);

    return result.rows[0];
  } catch (error) {
    console.error('Error retrieving user from the database:', error);
  } finally {
    client.release();
  }
};

export const createUser = async ({
  discordId,
  trainerCode,
  serverName,
  discordName,
  pokemonGoName,
  discordServerId,
}) => {
  const client = await pool.connect();
  console.log('CREATING OR UPDATING');
  console.log(
    discordId,
    trainerCode,
    serverName,
    discordName,
    pokemonGoName,
    discordServerId
  );
  try {
    const query = `
      INSERT INTO users (discord_id, trainer_code, server_name, discord_name, pokemon_go_name, discord_server_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (discord_id) DO UPDATE
      SET trainer_code = $2, server_name = $3, discord_name = $4, pokemon_go_name = $5, discord_server_id = $6
      RETURNING *;
    `;
    const result = await client.query(query, [
      discordId,
      trainerCode,
      serverName,
      discordName,
      pokemonGoName,
      discordServerId,
    ]);
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating or updating user:', error);
    throw error;
  } finally {
    client.release();
  }
};
