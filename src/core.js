import * as userUtil from './util/userUtil';
import * as messageUtil from './util/messageUtil';
import constants from './util/constants';

function getRandomFriend(friends) {
    const randomFriendIndex = Math.floor((Math.random() * friends.length));
    return friends[randomFriendIndex];
}

function isNameInMessage(friend, message) {
    return (new RegExp(friend.name, 'i')).test(message);
}

function isFriendActive(friend) {
    return friend.status === constants.status.ONLINE || friend.status === constants.status.IN_GAME;
}


export function createConversationChatMessage(friends, message, userName) {
    const fromUser = friends.find((friend) => isNameInMessage(friend, message));
    const newMessage = messageUtil.getRandomConversationMessage(userName);
    return createChatMessage(newMessage, fromUser);
}

function getOtherActiveFriends (friends, friend) {
  return friends.filter(function (f){
    return isFriendActive(f) && f.name !== friend.name;
  });
}

export function shouldSendGreetingMessage(friend, newStatus, friends){
  if(isFriendActive(friend)){
    return false;
  }
  const otherActiveFriends = getOtherActiveFriends(friends, friend);
  return otherActiveFriends.length > 0;
}

export function createGreetingChatMessage(friends, friend) {
  const otherFriends = getOtherActiveFriends (friends, friend);
  const fromFriend = getRandomFriend(otherFriends);
  const newMessage = messageUtil.getRandomGreetingMessage(friend.name);
  return createChatMessage(newMessage, fromFriend);
}

export function messageContainsActiveUserName(friends, message) {
    const activeFriends = friends.filter(isFriendActive);
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
      f.status = status;
    }
    return f;
  })
  return newFriends;
}
