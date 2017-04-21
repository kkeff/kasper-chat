class User {
    constructor(name, status) {
        this.name = name;
        this.status = status;
    }
}

export function createInitalUser () {
  return new User('kkeff', 'ONLINE');
}

export function createInitialFriends () {
  let friends = [];
  friends.push(new User('Kasper', 'ONLINE'));
  friends.push(new User('Victor', 'ONLINE'));
  friends.push(new User('Anders', 'OFFLINE'));
  friends.push(new User('Gustavii', 'OFFLINE'));
  friends.push(new User('Bartholdi', 'IN_GAME'));

  return friends;
}

var myVar;

function myFunction() {
    myVar = setTimeout(() => { that.setNewMessage }, 3000);
}

function myStopFunction() {
    clearTimeout(myVar);
}
