import AuthAgentClass from '@/es6-classes/auth-agent-class';
import AuthServiceClass from '@/es6-classes/auth-service-class';

// Create an automatic mock of AuthAgentClass
jest.mock('@/es6-classes/auth-agent-class');

describe('Testing mocking classes', () => {
  beforeEach(() => {
    // Clear all instances, calls to constructor and calls to all methods
    AuthAgentClass.mockClear();
  });

  test('that the AuthAgentClass is called in the AuthServiceClass constructor', () => {
    const authServiceClass = new AuthServiceClass();
    expect(AuthAgentClass).toHaveBeenCalledTimes(1);
  });

  test('that the AuthServiceClass called a method on the class and the value it was called with', () => {
    const authServiceClass = new AuthServiceClass();
    expect(AuthAgentClass).toHaveBeenCalledTimes(1);

    authServiceClass.login(false);

    // Get the mock instance
    const mockAuthAgentClass = AuthAgentClass.mock.instances[0];
    // Get the method of the mock instance we want to test
    const mockLogin = mockAuthAgentClass.login;
    expect(mockLogin).toHaveBeenCalledWith(false);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
