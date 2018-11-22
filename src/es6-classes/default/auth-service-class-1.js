import AuthAgentClass1 from './auth-agent-class-1';

export default class AuthServiceClass1 {
  constructor() {
    this.agent = new AuthAgentClass1();
  }

  login(popup = true) {
    this.agent.login(popup);
  }
}
