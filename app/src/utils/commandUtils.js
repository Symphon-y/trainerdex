import {
  InteractionResponseType,
} from 'discord-interactions';

export const handleTest = (res) => {
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      // Fetches a random emoji to send from a helper function
      content: 'hello world ' + getRandomEmoji(),
    },
  })
}