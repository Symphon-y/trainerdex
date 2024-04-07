import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils/index.js';
import { Client, GatewayIntentBits } from 'discord.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.DISCORD_PUBLIC_KEY) }));

// Create a new client instance with more intents
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
  ],
  partials: [
      'MESSAGE', 'CHANNEL', 'REACTION'
  ]
});

client.once('ready', () => {
    console.log('Discord bot is online!');
});

client.login(process.env.DISCORD_TOKEN);

console.log({
  environment: process.env.NODE_ENV,
  token: process.env.DISCORD_TOKEN,
  application_id: process.env.DISCORD_APPLICATION_ID,
  public_key: process.env.DISCORD_PUBLIC_KEY,
  port: process.env.PORT
})

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  console.log('***** Interactions endpoint reached *****')
  const { type, id, data } = req.body;

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
    const { name } = data;
    switch(name) {
      case 'test':
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: 'hello world ' + getRandomEmoji(),
          },
        });
        break;
      case '':
        break;
      default:
        return 'invalid input'
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});