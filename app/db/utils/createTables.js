import { pool } from '../index.js';
import { createServers, createServerUpdateTrigger } from '../models/servers.js';
import { createUsers, createUsersUpdateTrigger } from '../models/user.js';

async function createTables() {
  try {
    await pool.query(createServers);
    await pool.query(createServerUpdateTrigger);
    console.log('Servers Table created successfully.');
  } catch (error) {
    console.error('Error creating server tables:', error);
  }

  try {
    await pool.query(createUsers);
    await pool.query(createUsersUpdateTrigger);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating user table:', error);
  }
}

createTables();
