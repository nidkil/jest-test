import moduleB from '@/module_b'
import { sayWhat } from '@/module_a'

jest.mock("@/module_b");

const realSayIt = jest.requireActual("../src/module_b").default;
moduleB.mockImplementation(realSayIt);

describe("test mocking", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should say \'Hello world\'', () => {
    const say = 'Hello world';
    expect(sayWhat(say)).toBe(say);
  });

  test('if nothing is defined the default should be \'What?\'', () => {
    expect(sayWhat()).toBe('What?');
  });

  test('should overrule default', () => {
    const say = 'Overruled you!';
    moduleB.mockReturnValueOnce(say);
    expect(sayWhat()).toBe(say);
  });

  test('should overrule function', () => {
    const say = 'Overruled it!';
    moduleB.sayIt = jest.fn(() => say);
    expect(moduleB.sayIt()).toBe(say);
  });
});
