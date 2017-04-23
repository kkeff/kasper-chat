import * as messageUtil from './util/messageUtil';
import * as userUtil from './util/userUtil';
import constants from './util/constants';

function getRandomUser(friends) {
  const randomFriendIndex = Math.floor((Math.random() * friends.length));
  return friends[randomFriendIndex];
}

function isNameInMessage(friend, message) {
  return (new RegExp(friend.name, 'i')).test(message);
}

function isUserActive(friend) {
  return friend.status === constants.status.ONLINE || friend.status === constants.status.IN_GAME;
}


export function createConversationChatMessage(friends, message, userName) {
  const fromUser = friends.find((friend) => isNameInMessage(friend, message));
  const newMessage = messageUtil.getRandomConversationMessage(userName);
  return createChatMessage(newMessage, fromUser);
}

export function createIdleChatMessage(friends){
  const activeFriends = friends.filter(isUserActive);
  const randomFriend = getRandomUser(activeFriends);
  return createChatMessage(messageUtil.getRandomIdleMessage(), randomFriend);
}

function getOtherActiveUsers (friends, friend) {
  return friends.filter(function (f){
    return isUserActive(f) && f.name !== friend.name;
  });
}

export function shouldSendGreetingMessage(user, friends){
  if(isUserActive(user)){
    return false;
  }
  const otherActiveUsers = getOtherActiveUsers(friends, user);
  return otherActiveUsers.length > 0;
}

export function createGreetingChatMessage(friends, user) {
  const otherUsers = getOtherActiveUsers (friends, user);
  const fromUser = getRandomUser(otherUsers);
  const newMessage = messageUtil.getRandomGreetingMessage(user.name);
  return createChatMessage(newMessage, fromUser);
}

export function messageContainsActiveUserName(friends, message) {
  const activeFriends = friends.filter(isUserActive);
  return activeFriends.some((friend) => isNameInMessage(friend, message));
}

export function createChatMessage(message, user) {
  const newUser = {
    name: user.name,
    status: user.status
  };
  return {message: message, user: newUser}
}

export function sortFriends(friends) {
  const sortedFriends = [];

  function addIfStatus(friend, status) {
    if (friend.status === status) {
      sortedFriends.push(friend);
    }
  }

  friends.forEach((friend) => addIfStatus(friend, constants.status.IN_GAME));
  friends.forEach((friend) => addIfStatus(friend, constants.status.ONLINE));
  friends.forEach((friend) => addIfStatus(friend, constants.status.OFFLINE));

  return sortedFriends;
}

export function getStatusText(status) {
  if (status === constants.status.ONLINE) {
    return 'Online';
  } else if (status === constants.status.IN_GAME) {
    return 'In game';
  } else if (status === constants.status.OFFLINE) {
    return 'Offline';
  }
}

export function getFriendsWithNewStatus (friend, status, friends){
  const newFriends = friends.map(function(f){
    if(f.name === friend.name){
      return {name: f.name, status: status};
    }
    return f;
  });
  return newFriends;
}

export function shouldClearRandomMessageTimer(prevChatMessages, chatMessages){
  return chatMessages.length > prevChatMessages.length;
}

export function shouldClearRandomStatusChange(prevFriends, friends){
  const hasFriendStatusChanged = prevFriends.some(function (pf){
    return friends.some(function (f){
      return pf.name === f.name && pf.status !== f.status;
    })
  });
  return hasFriendStatusChanged;
}

function getNewRandomStatus (oldStatus){
  const statuses = userUtil.getStatuses();
  const index = statuses.indexOf(oldStatus);
  statuses.splice(index, 1);
  return statuses[Math.floor((Math.random() * statuses.length))];
}

export function getNewFriendsWithNewStatus(friends){
  let newFriends = [];
  const randomUser = getRandomUser(friends);
  friends.forEach((friend) => {
    if(randomUser.name !== friend.name){
      newFriends.push(friend);
    }
  });
  newFriends.push({name: randomUser.name, status: getNewRandomStatus(randomUser.status)});
  return newFriends;
}
