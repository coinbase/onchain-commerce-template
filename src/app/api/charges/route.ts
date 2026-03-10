import { NextResponse } from 'next/server';
import { COINBASE_COMMERCE_API_KEY } from 'src/config';
import { COMMERCE_API_URL } from 'src/links';
import type { ChargeDetails } from 'src/types';

function validateChargeDetails(body: unknown): body is ChargeDetails {
  if (typeof body !== 'object' || body === null) {
    return false;
  }
  const details = body as Record<string, unknown>;
  if (details.name !== undefined && typeof details.name !== 'string') {
    return false;
  }
  if (
    details.description !== undefined &&
    typeof details.description !== 'string'
  ) {
    return false;
  }
  if (
    details.pricing_type !== undefined &&
    typeof details.pricing_type !== 'string'
  ) {
    return false;
  }
  if (details.local_price !== undefined) {
    if (
      typeof details.local_price !== 'object' ||
      details.local_price === null
    ) {
      return false;
    }
    const price = details.local_price as Record<string, unknown>;
    if (
      typeof price.amount !== 'string' ||
      typeof price.currency !== 'string'
    ) {
      return false;
    }
  }
  return true;
}

export async function POST(request: Request) {
  if (!COINBASE_COMMERCE_API_KEY) {
    return NextResponse.json(
      { error: 'Missing Coinbase Commerce API key' },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 },
    );
  }

  if (!validateChargeDetails(body)) {
    return NextResponse.json(
      { error: 'Invalid charge details' },
      { status: 400 },
    );
  }

  try {
    const chargeDetails: ChargeDetails = body;

    const res = await fetch(`${COMMERCE_API_URL}/charges`, {
      method: 'POST',
      body: JSON.stringify(chargeDetails),
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': COINBASE_COMMERCE_API_KEY,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
        errorText,
      });
      return NextResponse.json(
        { error: `HTTP error! status: ${res.status}` },
        { status: res.status },
      );
    }

    const { data } = await res.json();
    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error('Error creating charge:', error);
    return NextResponse.json(
      { error: 'Failed to create charge' },
      { status: 500 },
    );
  }
}
