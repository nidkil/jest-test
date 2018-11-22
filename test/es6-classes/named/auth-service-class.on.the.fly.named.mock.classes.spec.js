import * as authAgent from '@/es6-classes/named/auth-agent-class-2';
import AuthServiceClass2 from '@/es6-classes/named/auth-service-class-2';

// Create a manual mock for a named export
const mockLogin = jest.fn();
authAgent.AuthAgentClass2 = jest.fn().mockImplementation(() => {
  return {
    login: mockLogin
  };
});

describe('Testing mocking a class that is a named export in a module', () => {
  beforeEach(() => {
    // Clear all instances calls to constructor and calls to all methods
    authAgent.AuthAgentClass2.mockClear();
    mockLogin.mockClear();
  });

  test('that the class that we are testing calls the constructor of the class it depends on', () => {
    new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);
  });

  test('that the mock implementation can be changed for a single test', () => {
    // This mock implementation will only be used for one call
    authAgent.AuthAgentClass2.mockImplementationOnce(() => {
      return {
        login: () => {
          throw new Error('Test error');
        },
      };
    });

    const authServiceClass2 = new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);

    expect(() => authServiceClass2.login()).toThrow();
  });

  test('that the class we are testing called a method on the class it depends on with the specified', () => {
    const authServiceClass2 = new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);

    authServiceClass2.login(false);

    expect(mockLogin).toHaveBeenCalledWith(false);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  test('that the class we are testing calls a method on the class it depends on with the default value', () => {
    const authServiceClass2 = new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);

    authServiceClass2.login();

    expect(mockLogin).toHaveBeenCalledWith(true);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
