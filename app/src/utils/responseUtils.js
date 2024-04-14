import { InteractionResponseType } from 'discord-interactions';
import { getRandomEmoji } from '../utils/index.js';

export const test = {
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    // Fetches a random emoji to send from a helper function
    content: 'hello, testing to see if gitworkflow worked ' + getRandomEmoji(),
  },
};

export const registerModal = {
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
};

export const modalConfirmation = {
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    // Fetches a random emoji to send from a helper function
    content:
      'Congratulations Trainer, you have successfully registered ' +
      getRandomEmoji(),
  },
};

export const getTrainerCode = async (client, guild_id) => {
  const guildCache = {};
  // Fetch all guilds (servers) the bot is in
  const guilds = client.guilds.cache.map((guild) => guild);

  // Iterate over each guild
  for (const guild of guilds) {
    try {
      // Fetch all members of the guild
      await guild.members.fetch();

      if (!guildCache[guild.id]) {
        guildCache[guild.id] = [];
      }
      // Log all members in the guild
      guild.members.cache.forEach((member) => {
        guildCache[guild.id].push(member);
      });
    } catch (error) {
      console.error(`Error fetching members for guild ${guild.id}:`, error);
    }
  }
  let guildMembers = guildCache[guild_id];

  let options = guildMembers.map((member) => {
    return {
      label: `${member.user.username}#${member.user.discriminator}`,
      value: member.user.id,
    };
  });

  options.sort((a, b) => {
    const usernameA = a.label.toLowerCase();
    const usernameB = b.label.toLowerCase();

    if (usernameA < usernameB) {
      return -1;
    }
    if (usernameA > usernameB) {
      return 1;
    }
    return 0;
  });

  // Respond with the select menu
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'Select a user:',
      components: [
        {
          type: 1, // Action row
          components: [
            {
              type: 3, // Select menu
              custom_id: 'user-selection',
              options,
            },
          ],
        },
      ],
    },
  };
};

export const trainerCodeByUserName = {
  type: InteractionResponseType.MODAL,
  data: {
    title: 'Search Trainer Code By Discord Username ',
    custom_id: 'trainercode-username',
    components: [
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
            placeholder: 'DiscordUser',
            required: true,
          },
        ],
      },
    ],
  },
};
