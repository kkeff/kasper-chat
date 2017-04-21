import * as userUtil from './util/userUtil';
import * as messageUtil from './util/messageUtil';

function getRandomFriend(friends) {
    const randomFriendIndex = Math.floor((Math.random() * friends.length));
    return friends[randomFriendIndex];
}

function isNameInMessage (friend, message) {
  return (new RegExp(friend.name, 'i')).test(message);
}

function isFriendActive (friend){
  return friend.status === 'ONLINE' || friend.status === 'IN_GAME';
}

export function createConversationChatMessage (friends, message, userName){
  const fromUser = friends.find((friend) => isNameInMessage(friend, message));
  const newMessage = messageUtil.getRandomConversationMessage(userName);
  return createChatMessage(newMessage, fromUser);
}

export function messageContainsActiveUserName (friends, message) {
  const activeFriends = friends.filter(isFriendActive);
  return activeFriends.some((friend) => isNameInMessage(friend, message));
}

export function createChatMessage(message, user){
  return {message: message, user: user}
}
