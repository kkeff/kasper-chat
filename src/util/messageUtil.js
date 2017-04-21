
export function randomGreetingMessage(userName){
  const greetingMessage = [`Yo, ${userName}!`, `How are you, ${userName}?`, `Are u up for some bf1 ${userName}`];
  const randomIndex = Math.floor((Math.random() * greetingMessage.length));
  return greetingMessage[randomIndex];
}

export function getRandomConversationMessage(userName){
  const greetingMessage = [`Yes of course!`, `It's ok ${userName}?`, `${userName} suuuuux`];
  const randomIndex = Math.floor((Math.random() * greetingMessage.length));
  return greetingMessage[randomIndex];
}
