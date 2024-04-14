import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

// Command containing options
const REGISTER_TRAINER = {
  type: 1,
  name: 'register',
  description: 'Register Trainer id',
};

const GET_TRAINER_CODE = {
  type: 1,
  name: 'trainercode-list',
  description: 'Get Trainer Code From List',
};

const GET_TRAINER_CODE_BY_USERNAME = {
  type: 1,
  name: 'trainercode-username',
  description: 'Get Trainer Code By Discord Username',
};

export const ALL_TRAINER_COMMANDS = [
  REGISTER_TRAINER,
  GET_TRAINER_CODE,
  GET_TRAINER_CODE_BY_USERNAME,
];
