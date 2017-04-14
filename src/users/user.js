class User {
  constructor(name, status) {
    this.name = name;
    this.status = status;
  }
}

export function createUser(){
  return new User('YAYAYAYAYA', 'ONLINE');
}
