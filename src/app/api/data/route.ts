import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/store';
import { checkRateLimit, sanitizeObject } from '@/lib/security';
import { AppStoreData } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const { allowed } = checkRateLimit(`get_data_${ip}`, 120, 60000);

  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 });
  }

  const data = getStoreData();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  });
}

export async function PUT(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const { allowed } = checkRateLimit(`put_data_${ip}`, 30, 60000);

    if (!allowed) {
      return NextResponse.json({ error: 'Too many updates. Please wait.' }, { status: 429 });
    }

    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Payload must be a valid JSON object' }, { status: 400 });
    }

    // Sanitize object recursively against XSS, Script Injections and Prototype Pollution
    const sanitizedData = sanitizeObject(body as AppStoreData);

    const success = saveStoreData(sanitizedData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to write to persistent storage' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Store data saved successfully' });
  } catch (error) {
    console.error('API PUT Error:', error);
    return NextResponse.json({ error: 'Invalid request or malicious payload rejected' }, { status: 400 });
  }
}
