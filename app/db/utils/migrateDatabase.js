import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import { pool } from '../index.js';

async function migrateDatabase() {
  try {
    // Get the path of the current module directory
    const __filename = fileURLToPath(import.meta.url);
    const migrationDir = path.join(path.dirname(__filename), '../migrations');

    // Get the list of files in the migrations directory
    const files = fs.readdirSync(migrationDir);

    // Filter out only the .sql files
    const sqlFiles = files.filter((file) => file.endsWith('.sql'));

    // Sort the files by their names to get the latest migration
    sqlFiles.sort();

    // Get the path of the latest migration file
    const latestMigration = path.join(
      migrationDir,
      sqlFiles[sqlFiles.length - 1]
    );

    // Read the content of the latest migration file
    const migrationScript = fs.readFileSync(latestMigration, 'utf8');

    // Execute the migration SQL script
    await pool.query(migrationScript);

    console.log('Migration executed successfully.');
  } catch (error) {
    console.error('Error executing migration:', error);
  }
}

migrateDatabase();
