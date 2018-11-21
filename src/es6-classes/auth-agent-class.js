export default class AuthAgentClass {
  constructor() {
    this.foo = 'bar';
  }

  login(popup = true) {
    if (popup) console.log('Using popup');
    else console.log('Using redirect');
  }
}
