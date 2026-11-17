import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData } from '@/lib/store';
import { checkRateLimit, sanitizeObject, sanitizeString, sanitizeNumber } from '@/lib/security';
import { Order } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const { allowed } = checkRateLimit(`get_orders_${ip}`, 60, 60000);

  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const store = getStoreData();
  return NextResponse.json(store.orders || []);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const { allowed } = checkRateLimit(`post_order_${ip}`, 15, 60000);

    if (!allowed) {
      return NextResponse.json({ error: 'Too many orders sent. Please wait.' }, { status: 429 });
    }

    const raw = await request.json();
    if (!raw || typeof raw !== 'object') {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 });
    }

    const store = getStoreData();

    // Sanitize customer details against XSS / Injection
    const customerName = sanitizeString(raw.customerName, 80);
    const customerPhone = sanitizeString(raw.customerPhone, 30);
    const deliveryAddress = sanitizeString(raw.deliveryAddress, 200);
    const notes = sanitizeString(raw.notes, 300);
    const paymentMethod = sanitizeString(raw.paymentMethod, 60) || 'Efectivo';
    const deliveryType = ['delivery', 'takeaway', 'dinein'].includes(raw.deliveryType)
      ? raw.deliveryType
      : 'delivery';

    if (!customerName || !customerPhone) {
      return NextResponse.json({ error: 'Customer name and phone are required' }, { status: 400 });
    }

    if (!Array.isArray(raw.items) || raw.items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }

    // Server-Side Price Verification to prevent client price tampering!
    let verifiedSubtotal = 0;
    const verifiedItems = [];

    for (const item of raw.items) {
      const product = store.products.find(p => p.id === item.productId || p.name === item.name);
      const safeQty = sanitizeNumber(item.quantity, 1, 50, 1);
      const safePrice = product ? product.price : sanitizeNumber(item.price, 0, 10000000, 0);

      verifiedSubtotal += safePrice * safeQty;
      verifiedItems.push({
        name: sanitizeString(item.name || (product ? product.name : 'Producto')),
        quantity: safeQty,
        price: safePrice,
        notes: sanitizeString(item.notes, 150),
      });
    }

    const verifiedDeliveryFee = deliveryType === 'delivery' ? (store.config.deliveryFee || 0) : 0;
    const verifiedTotal = verifiedSubtotal + verifiedDeliveryFee;

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customerName,
      customerPhone,
      deliveryType,
      deliveryAddress,
      paymentMethod,
      items: verifiedItems,
      subtotal: verifiedSubtotal,
      deliveryFee: verifiedDeliveryFee,
      total: verifiedTotal,
      notes,
      status: 'pendiente',
    };

    // Prepend new order to orders list
    const updatedOrders = [newOrder, ...(store.orders || [])];
    store.orders = updatedOrders.slice(0, 200); // keep last 200 orders

    saveStoreData(store);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Server error processing order' }, { status: 500 });
  }
}
