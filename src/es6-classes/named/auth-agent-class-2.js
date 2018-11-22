export const foo = 'bar';

export class AuthAgentClass2 {
  constructor() {
    this.foo = foo;
  }

  login(popup = true) {
    if (popup) console.log('Using popup');
    else console.log('Using redirect');
  }
}
