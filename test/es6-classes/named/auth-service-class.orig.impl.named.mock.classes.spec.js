import * as authAgent from '@/es6-classes/named/auth-agent-class-2';
import AuthServiceClass2 from '@/es6-classes/named/auth-service-class-2';

// Load the original login implementation using prototype and create a manual mock for a named export
const realLogin = jest.requireActual('@/es6-classes/named/auth-agent-class-2').AuthAgentClass2.prototype.login;
const defaultValue = 'changed';
const mockLogin = jest.fn().mockImplementation(() => {
  return defaultValue;
});
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
    const authServiceClass2 = new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);
    expect(authServiceClass2.login()).toBe(defaultValue);
  });

  test('that the mock implementation can be changed for a single test', () => {
    // This mock implementation will only be used for one call
    const oneTimeValue = 'changed again';
    authAgent.AuthAgentClass2 = jest.fn().mockImplementationOnce(() => {
      return {
        login: () => {
          return oneTimeValue;
        }
      };
    });

    const authServiceClass2 = new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);
    expect(authServiceClass2.login()).toBe(oneTimeValue);
  });

  test('that the default mock with implementation is restored after the one time implementation has completed', () => {
    const authServiceClass2 = new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);
    expect(authServiceClass2.login()).toBe(defaultValue);
  });

  test('that the original implementation can be restored for one test case', () => {
    // This mock implementation will only be used for one call
    const originalValue = 'popup';
    authAgent.AuthAgentClass2.mockImplementationOnce(() => {
      return {
        login: realLogin
      };
    });

    const authServiceClass2 = new AuthServiceClass2();
    expect(authAgent.AuthAgentClass2).toHaveBeenCalledTimes(1);
    expect(authServiceClass2.login()).toBe(originalValue);
  });
});
