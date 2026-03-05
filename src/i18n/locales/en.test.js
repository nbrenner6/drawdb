import { describe, it, expect } from 'vitest';
import { en } from './en';

describe('English translations', () => {
  it('defines delete_all_fields translation key', () => {
    expect(en.translation.delete_all_fields).toBe('Delete all fields');
  });
});

