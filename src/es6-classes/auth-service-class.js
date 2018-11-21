import AuthAgentClass from './auth-agent-class';

export default class AuthServiceClass {
  constructor() {
    this.agent = new AuthAgentClass();
  }

  login(popup = true) {
    this.agent.login(popup);
  }
}
