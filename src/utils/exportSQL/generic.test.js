import { describe, it, expect } from 'vitest';
import { getJsonType } from './generic';

describe('getJsonType for MYPRIMETYPE', () => {
  it('returns a JSON schema with type number', () => {
    const field = { type: 'MYPRIMETYPE', values: [] };
    const schema = getJsonType(field);

    expect(schema).toContain('"type" : "number"');
  });
});

