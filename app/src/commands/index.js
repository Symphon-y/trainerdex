import { InstallGlobalCommands } from '../utils.js';
import { ALL_TRAINER_COMMANDS } from "./trainerCommands"
import { ALL_SERVER_COMMANDS } from "./serverCommands"

const ALL_COMMANDS = ALL_SERVER_COMMANDS.concat(ALL_TRAINER_COMMANDS)

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);