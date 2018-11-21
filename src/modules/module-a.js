import { sayIt } from './module-b'

export function sayWhat(say = null) {
  return say || sayIt();
}

export default sayWhat;
