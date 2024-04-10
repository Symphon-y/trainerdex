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

export const ALL_TRAINER_COMMANDS = [REGISTER_TRAINER];
