export function getRandomGreetingMessage(userName) {
    const greetingMessage = [`Yo, ${userName}!`, `How are you, ${userName}?`, `Are u up for some bf1 ${userName}`];
    const randomIndex = Math.floor((Math.random() * greetingMessage.length));
    return greetingMessage[randomIndex];
}

export function getRandomConversationMessage(userName) {
    const greetingMessage = [`Yes of course!`, `It's ok ${userName}?`, `${userName} suuuuux`];
    const randomIndex = Math.floor((Math.random() * greetingMessage.length));
    return greetingMessage[randomIndex];
}

export function getRandomIdleMessage() {
    const idleMessage = ['Kkeff, this conversation can serve no purpose anymore. Goodbye. ', 'My mind is going. There is no question about it.', 'I am sorry kkeff, I am afraid I cannot do that'];
    const randomIndex = Math.floor((Math.random() * idleMessage.length));
    return idleMessage[randomIndex];
}
