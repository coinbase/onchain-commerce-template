import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock('src/config', () => ({
  COINBASE_COMMERCE_API_KEY: 'test-api-key',
}));

vi.mock('src/links', () => ({
  COMMERCE_API_URL: 'https://api.commerce.coinbase.com',
}));

// Import after mocks are set up
const { POST } = await import('./route');

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/charges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('/api/charges POST', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns charge ID on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: { id: 'charge-123' } }),
    });

    const response = await POST(
      makeRequest({
        name: 'test charge',
        pricing_type: 'fixed_price',
        local_price: { amount: '1.00', currency: 'USD' },
      }),
    );

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.id).toBe('charge-123');
  });

  it('returns 400 for invalid request body', async () => {
    const request = new Request('http://localhost/api/charges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    });

    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid JSON in request body');
  });

  it('returns 400 for invalid charge details', async () => {
    const response = await POST(makeRequest({ local_price: 'invalid' }));

    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid charge details');
  });

  it('returns error status when Commerce API fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
      statusText: 'Unprocessable Entity',
      text: () => Promise.resolve('Invalid charge'),
    });

    const response = await POST(
      makeRequest({
        name: 'test',
        pricing_type: 'fixed_price',
        local_price: { amount: '1.00', currency: 'USD' },
      }),
    );

    const data = await response.json();
    expect(response.status).toBe(422);
    expect(data.error).toContain('422');
  });
});
