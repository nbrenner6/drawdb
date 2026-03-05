import { describe, it, expect } from 'vitest';
import { defaultTypes } from './datatypes';

describe('MYPRIMETYPE default validation', () => {
  const checkDefault = defaultTypes.MYPRIMETYPE.checkDefault;

  const makeField = (value) => ({ default: value });

  it('accepts positive odd integers', () => {
    expect(checkDefault(makeField('1'))).toBe(true);
    expect(checkDefault(makeField('3'))).toBe(true);
    expect(checkDefault(makeField('9'))).toBe(true);
  });

  it('rejects even integers', () => {
    expect(checkDefault(makeField('0'))).toBe(false);
    expect(checkDefault(makeField('2'))).toBe(false);
    expect(checkDefault(makeField('10'))).toBe(false);
  });

  it('rejects negative integers', () => {
    expect(checkDefault(makeField('-1'))).toBe(false);
    expect(checkDefault(makeField('-3'))).toBe(false);
  });

  it('rejects non-integer values', () => {
    expect(checkDefault(makeField('1.5'))).toBe(false);
    expect(checkDefault(makeField('abc'))).toBe(false);
    expect(checkDefault(makeField(''))).toBe(false);
  });
});

