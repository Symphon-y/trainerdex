// Simple method that returns a random emoji from list
export const getRandomEmoji = () => {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}