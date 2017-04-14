const messages =  ['Message1', 'Message2', 'Message3', 'Message4', 'Message5', 'Message6'];

class Bot {
  constructor(name, status) {
    this.name = name;
    this.status = status;
    this.messages = messages;
  }
}

export function createBots(){
  const bots = [];
  users.push(new Bot('Kasper1', 'ONLINE'));
  users.push(new Bot('Kasper2', 'ONLINE'));
  users.push(new Bot('Kasper3', 'OFFLINE'));
  users.push(new Bot('Kasper4', 'OFFLINE'));
  users.push(new Bot('Kasper5', 'IN_GAME'));

  return bots;
}
