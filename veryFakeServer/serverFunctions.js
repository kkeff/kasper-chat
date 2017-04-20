function getActiveFriends (friends) {
  return friends.filter(function (friend) {
      return friend.status === 'ONLINE' || friend.status === 'IN_GAME';
  })
}

function getRandomFriend(friends) {
    const randomFriendIndex = Math.floor((Math.random() * friends.length));
    return friends[randomFriendIndex];
}

function isUserNameInMessage (userName, message) {
  return (new RegExp(userName, 'i')).test(message);
}

export function sendConversationMessage (friends, user){
  const toUser = friends.find(isUserNameInMessage);
}

export function messageContainsActiveUserName (friends, message) {

  const activeFriends = getActiveFriends(friends);
  return activeFriends.some((friend) => isUserNameInMessage(friend, message));
}
