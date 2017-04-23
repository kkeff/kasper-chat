import * as userUtil from './userUtil';

export function createChatMessage(message, user) {
  const newUser = {
    name: user.name,
    status: user.status
  };
  return {message: message, user: newUser}
}

export function createConversationChatMessage(friends, message, userName) {
  const fromUser = friends.find((friend) => isNameInMessage(friend, message));
  const newMessage = getRandomConversationMessage(userName);
  return createChatMessage(newMessage, fromUser);
}

export function createGreetingChatMessage(friends, user) {
  const otherUsers = userUtil.getOtherActiveUsers (friends, user);
  const fromUser = userUtil.getRandomUser(otherUsers);
  const newMessage = getRandomGreetingMessage(user.name);
  return createChatMessage(newMessage, fromUser);
}

export function hasNewMessageBeenAdded(prevChatMessages, chatMessages){
  return chatMessages.length > prevChatMessages.length;
}

export function createIdleChatMessage(friends){
  const activeFriends = friends.filter(userUtil.isUserActive);
  const randomFriend = userUtil.getRandomUser(activeFriends);
  return createChatMessage(getRandomIdleMessage(), randomFriend);
}

function getRandomGreetingMessage(userName) {
  const greetingMessage = [`Yo, ${userName}!`, `How are you, ${userName}?`, `Are u up for some bf1 ${userName}`];
  const randomIndex = Math.floor((Math.random() * greetingMessage.length));
  return greetingMessage[randomIndex];
}

function getRandomConversationMessage(userName) {
  const greetingMessage = [`Yes of course!`, `It's ok ${userName}?`, `${userName} suuuuux`];
  const randomIndex = Math.floor((Math.random() * greetingMessage.length));
  return greetingMessage[randomIndex];
}

function getRandomIdleMessage() {
  const idleMessage = ['Kkeff, this conversation can serve no purpose anymore. Goodbye. ', 'My mind is going. There is no question about it.', 'I am sorry kkeff, I am afraid I cannot do that'];
  const randomIndex = Math.floor((Math.random() * idleMessage.length));
  return idleMessage[randomIndex];
}


function isNameInMessage(friend, message) {
  return (new RegExp(friend.name, 'i')).test(message);
}

export function messageContainsActiveUserName(friends, message) {
  const activeFriends = friends.filter(userUtil.isUserActive);
  return activeFriends.some((friend) => isNameInMessage(friend, message));
}

export function shouldSendGreetingMessage(user, friends){
  if(userUtil.isUserActive(user)){
    return false;
  }
  const otherActiveUsers = userUtil.getOtherActiveUsers(friends, user);
  return otherActiveUsers.length > 0;
}
