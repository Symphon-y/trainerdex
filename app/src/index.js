import 'dotenv/config';
import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji } from './utils/index.js';
import { Client, GatewayIntentBits } from 'discord.js';
import * as responses from './utils/responseUtils.js';
import { createDiscordServers } from './services/discordServerService.js';
import {
  createOrUpdateUser,
  getTrainerCodeFromSelection,
  getTrainerCodeByUsername,
} from './services/userService.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(
  express.json({ verify: VerifyDiscordRequest(process.env.DISCORD_PUBLIC_KEY) })
);

// Create a new client instance with more intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
  // Get the IDs of all the guilds (servers) the bot is in
  const serverIds = client.guilds.cache;
  createDiscordServers(serverIds);
  console.log('Discord bot is online!');
});

client.login(process.env.DISCORD_TOKEN);

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  console.log('***** Interactions endpoint reached *****');
  const { type, id, data, guild_id, member } = req.body;
  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    let result;
    const { name } = data;
    switch (name) {
      case 'test':
        return res.send(responses.test);
      case 'register':
        return res.send(responses.registerModal);
      case 'trainercode-list':
        result = await responses.getTrainerCode(client, guild_id);
        return res.send(result);
      case 'trainercode-username':
        return res.send(responses.trainerCodeByUserName);
      default:
        return 'invalid input';
    }
  } else if (type === InteractionType.MODAL_SUBMIT) {
    const { custom_id, components } = data;
    console.log(custom_id);
    switch (custom_id) {
      case 'trainercode-username':
        // Retrieve the typed input value from the interaction data
        const userInput = components[0].components[0].value;

        // Handle the user input as needed (e.g., make a database query)
        // Example:
        const result = await getTrainerCodeByUsername({
          userName: userInput,
          discordServerId: guild_id,
        });

        // Respond to the user with the result or perform other actions
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `${userInput}'s Trainer Code is ${result?.trainer_code}`,
          },
        });
        return null;
      case 'register-trainer-code':
        console.log(member);
        const trainerCode = data.components[0].components[0].value;
        const pokemonGoName = data.components[1].components[0].value;
        // const pokemonGoName = data.components[2].components[0].value;

        createOrUpdateUser({
          discordId: member.user.id,
          trainerCode,
          serverName: member.user.global_name,
          discordName: member.user.username,
          pokemonGoName,
          discordServerId: guild_id,
        });
        res.send(responses.modalConfirmation);
        return;
      default:
        return 'invalid input';
    }
  } else if (type === InteractionType.MESSAGE_COMPONENT) {
    // Handle interaction with message components (e.g., select menu)
    const { custom_id, values } = data;

    if (custom_id === 'user-selection' && values.length > 0) {
      const selectedUserId = values[0]; // Get the selected user ID

      // Make a request to your database to retrieve the trainer code of the selected user
      const trainer = await getTrainerCodeFromSelection({
        userId: selectedUserId,
        discordServerId: guild_id,
      });

      // Respond with the trainer code
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `The trainer code of the selected user is: ${
            trainer?.trainer_code ? trainer?.trainer_code : 'not yet registered'
          }`,
        },
      });
    }
    // else if (custom_id === 'user-input') {
    //   // Retrieve the typed input value from the interaction data
    //   const userInput = values[0];

    //   // Handle the user input as needed (e.g., make a database query)
    //   // Example:
    //   const result = await getTrainerCodeByUsername({
    //     userId: userInput,
    //     discordServerId: guild_id,
    //   });

    //   // Respond to the user with the result or perform other actions
    //   return res.send({
    //     type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    //     data: {
    //       content: `${userInput}'s Trainer Code is ${result}`,
    //     },
    //   });
    // }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
