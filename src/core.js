export function getRandomMessage(bots) {
    const activeBots = getActiveBots(bots);
    const randomActiveBot = getRandomBot(activeBots);
    const randomBotMessageIndex = Math.floor((Math.random() * randomActiveBot.messages.length));
    return {
        user: {
            name: randomActiveBot.name,
            status: randomActiveBot.status
        },
        message: randomActiveBot.messages[randomBotMessageIndex]
    };
}

function getRandomBot(bots) {
    const randomBotIndex = Math.floor((Math.random() * bots.length));
    return bots[randomBotIndex];
}

function getActiveBots(bots) {
    return bots.filter(function (bot) {
        return bot.status === 'ONLINE' || bot.status === 'IN_GAME';
    })
}
