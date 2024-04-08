// Command containing options
const REGISTER_TRAINER = {
  name: 'register',
  description: 'Register your Trainer Code to TrainérDex.',
  options: [
    {
      type: 3, // Type 3 is "STRING" for text input
      name: 'trainercode',
      description: 'Your Pokémon GO Trainer Code',
      required: true, // Make this field required
    },
  ],
  type: 1, // Type 1 is "CHAT_INPUT" for slash commands
};

export const ALL_TRAINER_COMMANDS = [REGISTER_TRAINER];