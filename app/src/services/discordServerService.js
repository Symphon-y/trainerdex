import { createServer } from '../../db/repository/serverRepository.js';

export const createDiscordServers = (servers) => {
  servers.forEach((server) => createServer(server.id));
};
