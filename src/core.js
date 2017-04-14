export function getRandomMessage(bots){
  const activeBots = getActiveUsers(bots);
  const randomActiveBot = getRandomBot(activeBots);
  const randomBotMessageIndex = Math.floor((Math.random() * randomActiveBot.messages.length));
  return {
    user: randomActiveBot.name,
    message: randomActiveBot.messages[randomBotMessageIndex]
  };
}

function getRandomBot(bots){
  const randomBotIndex = Math.floor((Math.random() * users.length));
  return bots[randomBotIndex];
}

function getActiveBots (bots){
  return bots.filter(function (bot){
    return bot.status === 'ONLINE' || bot.status === 'IN_GAME';
  })
}
