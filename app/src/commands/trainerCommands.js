// Command containing options
const REGISTER_TRAINER = {
  name: 'register',
  description: 'Register your Trainer Code to TrainérDex.',
  options: [
    {
      type: 3, // Type 3 is "STRING"
      name: 'trainercode',
      description: 'Your Pokémon GO Trainer Code',
      required: true,
    },
    {
      type: 3, // Type 3 is "STRING"
      name: 'serverusername',
      description: 'Your Server Username',
      required: true,
    },
    {
      type: 3, // Type 3 is "STRING"
      name: 'pogousername',
      description: 'Your Pokémon GO Username',
      required: false,
    },
  ],
  type: 1, // Type 1 is "CHAT_INPUT" for slash commands
};

export const ALL_TRAINER_COMMANDS = [REGISTER_TRAINER];
