import constants from './constants';

export function createInitalUser () {
  return {name: 'kkeff', status: constants.status.ONLINE};
}

export function createInitialFriends () {
  let friends = [];
  friends.push({name: 'Kasper', status: constants.status.ONLINE});
  friends.push({name: 'Victor', status: constants.status.ONLINE});
  friends.push({name: 'Anders', status: constants.status.OFFLINE});
  friends.push({name: 'Gustavii', status: constants.status.OFFLINE});
  friends.push({name: 'Bartholdi', status: constants.status.IN_GAME});
  return friends;
}

export function getStatuses() {
    return [constants.status.ONLINE, constants.status.IN_GAME, constants.status.OFFLINE]
}
