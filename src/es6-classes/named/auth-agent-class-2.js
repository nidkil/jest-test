export const foo = 'bar';

export class AuthAgentClass2 {
  constructor() {
    this.foo = foo;
  }

  login(popup = true) {
    if (popup) return 'popup';
    else return 'redirect';
  }
}
