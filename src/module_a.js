import { sayIt } from '@/module_b'

export function sayWhat(say = null) {
  return say || sayIt();
}

export default sayWhat;
