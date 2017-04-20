const messages = ['Message1', 'Message2', 'Message3', 'Message4', 'Message5', 'Message6'];

class Bot {
    constructor(name, status) {
        this.name = name;
        this.status = status;
        this.messages = messages;
    }
}

export function createBots() {
    const bots = [];
    bots.push(new Bot('Kasper1', 'ONLINE'));
    bots.push(new Bot('Kasper2', 'ONLINE'));
    bots.push(new Bot('Kasper3', 'OFFLINE'));
    bots.push(new Bot('Kasper4', 'OFFLINE'));
    bots.push(new Bot('Kasper5', 'IN_GAME'));

    return bots;
}
