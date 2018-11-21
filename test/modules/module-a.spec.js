// Used for the function
import * as moduleB from '@/modules/module-b'
// Used for the default export
import defaultModuleB from '@/modules/module-b'
import { sayWhat } from '@/modules/module-a'

// Mock the module
jest.mock("@/modules/module-b");

// Retrieve the default export implementation
const realSayIt = jest.requireActual("@/modules/module-b").default;
// Set it as implementation so that it works at it is meant to work
defaultModuleB.mockImplementation(realSayIt);

const defaultValue = 'What?'

describe("test mocking", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('default behaviour should say \'Hello world\'', () => {
    const say = 'Hello world';
    expect(sayWhat(say)).toBe(say);
  });

  test('if nothing is defined the default should be \'' + defaultValue + '\'', () => {
    expect(sayWhat()).toBe(defaultValue);
  });

  test('should overrule the default, but not the function itself', () => {
    const say = 'Overruled you!';
    // Overrule the default export implementation
    defaultModuleB.mockReturnValueOnce(say);
    expect(sayWhat()).toBe(say);
    // The implementation of the function should be unchanged
    expect(moduleB.sayIt()).toBe(defaultValue);
  });

  test('should overrule the function, but not the default', () => {
    const say = 'Overruled it!';
    expect(moduleB.sayIt()).toBe(defaultValue);
    // Overrule the function implementation
    moduleB.sayIt = jest.fn(() => say);
    expect(moduleB.sayIt()).toBe(say);
    expect(sayWhat()).toBe(say);
    // The implementation of the default should be unchanged
    expect(defaultModuleB()).toBe(defaultValue)
  });
});
