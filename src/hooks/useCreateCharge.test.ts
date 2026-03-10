import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useCreateCharge from './useCreateCharge';

const mockFetch = vi.fn();

describe('useCreateCharge', () => {
  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns charge ID on successful creation', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 'charge-abc' }),
    });

    const { result } = renderHook(() => useCreateCharge());
    const id = await result.current.createCharge({
      name: 'test',
      pricing_type: 'fixed_price',
      local_price: { amount: '1.00', currency: 'USD' },
    });

    expect(id).toBe('charge-abc');
    expect(mockFetch).toHaveBeenCalledWith('/api/charges', {
      method: 'POST',
      body: expect.any(String),
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('throws on API error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid charge details' }),
    });

    const { result } = renderHook(() => useCreateCharge());
    await expect(result.current.createCharge({ name: 'test' })).rejects.toThrow(
      'Invalid charge details',
    );
  });

  it('throws on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network failure'));

    const { result } = renderHook(() => useCreateCharge());
    await expect(result.current.createCharge({ name: 'test' })).rejects.toThrow(
      'Network failure',
    );
  });
});
