import constants from './constants';

class User {
    constructor(name, status) {
        this.name = name;
        this.status = status;
    }
}

export function createInitalUser () {
  return new User('kkeff', constants.status.ONLINE);
}

export function createInitialFriends () {
  let friends = [];
  friends.push(new User('Kasper', constants.status.ONLINE));
  friends.push(new User('Victor', constants.status.ONLINE));
  friends.push(new User('Anders', constants.status.OFFLINE));
  friends.push(new User('Gustavii', constants.status.OFFLINE));
  friends.push(new User('Bartholdi', constants.status.IN_GAME));

  return friends;
}

export function getStatuses() {
    return [constants.status.ONLINE, constants.status.IN_GAME, constants.status.OFFLINE]
}