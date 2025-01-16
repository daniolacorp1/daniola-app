import { describe, it, expect } from 'vitest';
import { useAuthStore } from './useauthstore';

describe('useAuthStore', () => {
  it('should have initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(false);
  });
});