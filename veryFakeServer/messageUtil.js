
export function randomGreetingMessage(userName){
  const greetingMessage = [`Yo, ${userName}!`, `How are you, ${name}?`, `Are u up for some bf1 ${userName}`];
  const randomIndex = Math.floor((Math.random() * greetingMessage.length));
  return greetingMessage[randomIndex];
}
