import constants from './constants';

export function createInitalUser () {
  return {name: 'kkeff', status: constants.status.ONLINE};
}

export function createInitialFriends () {
  let friends = [];
  friends.push({name: 'Dr. Dave', status: constants.status.ONLINE});
  friends.push({name: 'HAL 9000', status: constants.status.ONLINE});
  friends.push({name: 'Elena', status: constants.status.OFFLINE});
  friends.push({name: 'Dr. Frank', status: constants.status.OFFLINE});
  friends.push({name: 'Moon-Watcher', status: constants.status.IN_GAME});
  return friends;
}

export function getStatuses() {
  return [constants.status.ONLINE, constants.status.IN_GAME, constants.status.OFFLINE]
}
