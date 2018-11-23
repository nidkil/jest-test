export default class AuthAgentClass1 {
  constructor() {
    this.foo = 'bar';
  }

  login(popup = true) {
    if (popup) return 'popup';
    else return 'redirect';
  }
}
