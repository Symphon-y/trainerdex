import 'dotenv/config';
import { ALL_SERVER_COMMANDS } from './serverCommands.js';
import { ALL_TRAINER_COMMANDS } from './trainerCommands.js';
import { InstallGlobalCommands } from '../utils/index.js';

const ALL_COMMANDS = ALL_SERVER_COMMANDS.concat(ALL_TRAINER_COMMANDS);

InstallGlobalCommands(process.env.DISCORD_APPLICATION_ID, ALL_COMMANDS);
