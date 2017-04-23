import constants from './constants';

export function createInitialFriends () {
  let friends = [];
  friends.push({name: 'Dave', status: constants.status.ONLINE});
  friends.push({name: 'HAL', status: constants.status.ONLINE});
  friends.push({name: 'Elena', status: constants.status.OFFLINE});
  friends.push({name: 'Frank', status: constants.status.OFFLINE});
  friends.push({name: 'Moon', status: constants.status.IN_GAME});
  return friends;
}

export function createInitalUser () {
  return {name: 'kkeff', status: constants.status.ONLINE};
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

function getNewRandomStatus (oldStatus){
  const statuses = getStatuses();
  const index = statuses.indexOf(oldStatus);
  statuses.splice(index, 1);
  return statuses[Math.floor((Math.random() * statuses.length))];
}

export function getPoopSmileySrc(status){
  if (status === constants.status.ONLINE) {
    return 'dist/img/frowning-poop-smiley.png';
  } else if (status === constants.status.IN_GAME){
    return 'dist/img/happy-poop-smiley.jpg';
  } else {
    return 'dist/img/sad-poop-smiley.jpg';
  }
}

export function getRandomUser(friends) {
  const randomFriendIndex = Math.floor((Math.random() * friends.length));
  return friends[randomFriendIndex];
}

export function getOtherActiveUsers (friends, friend) {
  return friends.filter(function (f){
    return isUserActive(f) && f.name !== friend.name;
  });
}

function getStatuses() {
  return [constants.status.ONLINE, constants.status.IN_GAME, constants.status.OFFLINE]
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

export function isUserActive(friend) {
  return friend.status === constants.status.ONLINE || friend.status === constants.status.IN_GAME;
}

export function hasFriendStatusChanged(prevFriends, friends){
  return prevFriends.some(function (pf){
    return friends.some(function (f){
      return pf.name === f.name && pf.status !== f.status;
    })
  });
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
