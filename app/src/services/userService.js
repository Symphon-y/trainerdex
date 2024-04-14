import {
  createUser,
  getUserById,
  getUserByUsername,
} from '../../db/repository/userRepository.js';

export const createOrUpdateUser = ({
  discordId,
  trainerCode,
  serverName,
  discordName,
  pokemonGoName,
  discordServerId,
}) => {
  createUser({
    discordId,
    trainerCode,
    serverName,
    discordName,
    pokemonGoName,
    discordServerId,
  });
};

export const getTrainerCodeFromSelection = async ({
  userId,
  discordServerId,
}) => {
  return await getUserById({ userId, discordServerId });
};

export const getTrainerCodeByUsername = async ({
  userName,
  discordServerId,
}) => {
  return await getUserByUsername({ userName, discordServerId });
};
