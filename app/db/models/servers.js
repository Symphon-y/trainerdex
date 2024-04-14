export const createServers = ` CREATE TABLE IF NOT EXISTS discord_servers (
  id SERIAL PRIMARY KEY,
  discord_server_id VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const createServerUpdateTrigger = `
CREATE OR REPLACE FUNCTION update_server_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_discord_servers_updated_at ON discord_servers;

CREATE TRIGGER update_discord_servers_updated_at
BEFORE UPDATE ON discord_servers
FOR EACH ROW
EXECUTE FUNCTION update_server_updated_at_column();
`;
