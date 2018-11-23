import AuthAgentClass1 from '@/es6-classes/default/auth-agent-class-1';
import AuthServiceClass1 from '@/es6-classes/default/auth-service-class-1';

// Create a manual mock for a default export
const mockLogin = jest.fn();
jest.mock('@/es6-classes/default/auth-agent-class-1', () => {
  // This is the default mock implementation
  return jest.fn().mockImplementation(() => {
    return {
      login: mockLogin
    };
  });
});

describe('Testing mocking a class that is a default export in a module', () => {
  beforeEach(() => {
    // Clear all instance calls to constructor and calls to all methods
    AuthAgentClass1.mockClear();
    mockLogin.mockClear();
  });

  test('that the class that we are testing calls the constructor of the class it depends on', () => {
    new AuthServiceClass1();
    expect(AuthAgentClass1).toHaveBeenCalledTimes(1);
  });

  test('that the mock implementation can be changed for a single test', () => {
    // This mock implementation will only be used for one call
    AuthAgentClass1.mockImplementationOnce(() => {
      return {
        login: () => {
          throw new Error('Test error');
        },
      };
    });

    const authServiceClass1 = new AuthServiceClass1();
    expect(AuthAgentClass1).toHaveBeenCalledTimes(1);

    expect(() => authServiceClass1.login()).toThrow();
  });

  test('that the class we are testing called a method on the class it depends on with the specified value', () => {
    const authServiceClass1 = new AuthServiceClass1();
    expect(AuthAgentClass1).toHaveBeenCalledTimes(1);

    authServiceClass1.login(false);

    expect(mockLogin).toHaveBeenCalledWith(false);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  test('that the class we are testing calls a method on the class it depends on with the default value', () => {
    const authServiceClass1 = new AuthServiceClass1();
    expect(AuthAgentClass1).toHaveBeenCalledTimes(1);

    authServiceClass1.login();

    expect(mockLogin).toHaveBeenCalledWith(true);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
