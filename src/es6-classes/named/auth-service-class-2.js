import { AuthAgentClass2 } from './auth-agent-class-2';

export default class AuthServiceClass2 {
  constructor() {
    this.agent = new AuthAgentClass2();
  }

  login(popup = true) {
    this.agent.login(popup);
  }
}
