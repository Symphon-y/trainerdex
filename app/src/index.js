import 'dotenv/config';
import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji } from './utils/index.js';
import { Client, GatewayIntentBits } from 'discord.js';

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
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
  console.log('Discord bot is online!');
});

client.login(process.env.DISCORD_TOKEN);

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  console.log('***** Interactions endpoint reached *****');
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
    switch (name) {
      case 'test':
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content:
              'hello, testing to see if gitworkflow worked ' + getRandomEmoji(),
          },
        });
      case 'register':
        return res.send({
          type: InteractionResponseType.MODAL,
          data: {
            title: 'Register Trainer Code',
            custom_id: 'register-trainer-code',
            components: [
              {
                type: 1,
                components: [
                  {
                    type: 4,
                    custom_id: 'trainer-code',
                    label: 'Trainer Code',
                    style: 1,
                    min_length: 12,
                    max_length: 14,
                    placeholder: '0879 2118 9758',
                    required: true,
                  },
                ],
              },
              {
                type: 1,
                components: [
                  {
                    type: 4,
                    custom_id: 'discord-user-name',
                    label: 'Discord User Name',
                    style: 1,
                    min_length: 1,
                    max_length: 24,
                    placeholder: 'MySuperCoolUserName',
                    required: true,
                  },
                ],
              },
              {
                type: 1,
                components: [
                  {
                    type: 4,
                    custom_id: 'po-go-user-name',
                    label: 'Pokemon Go User Name (optional)',
                    style: 1,
                    min_length: 1,
                    max_length: 24,
                    placeholder: 'PogoUserName',
                    required: false,
                  },
                ],
              },
            ],
          },
        });
      default:
        return 'invalid input';
    }
  } else if (type === InteractionType.MODAL_SUBMIT) {
    console.log({ type, id, data });
    // {
    //   type: 5,
    //   id: '1227569381643649068',
    //   data: {
    //     components: [ [Object], [Object], [Object] ],
    //     custom_id: 'register-trainer-code'
    //   }
    // }
    console.log(data.components[0].components);
    // [ { custom_id: 'trainer-code', type: 4, value: '123412341233' } ]
    console.log(data.components[1].components);
    // [ { custom_id: 'discord-user-name', type: 4, value: 'asdfasdf' } ]
    console.log(data.components[2].components);
    // [ { custom_id: 'po-go-user-name', type: 4, value: 'hellopogofan' } ]

    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content:
          'Congratulations Trainer, you have successfully registered ' +
          getRandomEmoji(),
      },
    });
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
