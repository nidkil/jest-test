import AuthAgentClass1 from '@/es6-classes/default/auth-agent-class-1';
import AuthServiceClass1 from '@/es6-classes/default/auth-service-class-1';

// Create an automatic mock of AuthAgentClass1
jest.mock('@/es6-classes/default/auth-agent-class-1');

describe('Testing mocking classes', () => {
  beforeEach(() => {
    // Clear all instance calls to constructor and calls to all methods
    AuthAgentClass1.mockClear();
  });

  test('that the AuthAgentClass1 is called in the AuthServiceClass1 constructor', () => {
    new AuthServiceClass1();
    expect(AuthAgentClass1).toHaveBeenCalledTimes(1);
  });

  test('that the AuthServiceClass1 called a method on the class and the value it was called with', () => {
    const authServiceClass1 = new AuthServiceClass1();
    expect(AuthAgentClass1).toHaveBeenCalledTimes(1);

    authServiceClass1.login(false);

    // Get the mock instance
    const mockAuthAgentClass = AuthAgentClass1.mock.instances[0];
    // Get the method of the mock instance we want to test
    const mockLogin = mockAuthAgentClass.login;
    expect(mockLogin).toHaveBeenCalledWith(false);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
