/**
 * POST /api/checkout — create a Stripe Checkout Session for sadaqah.
 *
 * Request body:
 *   { amount: number in USD dollars, recurring?: boolean }
 *
 * Returns:
 *   { url: string } — the Stripe-hosted Checkout URL to redirect to
 */
import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';

const MIN_AMOUNT_USD = 1;
const MAX_AMOUNT_USD = 5000;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Payments are not configured. Please try again later.' },
      { status: 503 },
    );
  }

  let amount: number;
  let recurring = false;
  try {
    const body = await request.json();
    amount = Math.round(Number(body.amount));
    recurring = Boolean(body.recurring);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!Number.isFinite(amount) || amount < MIN_AMOUNT_USD || amount > MAX_AMOUNT_USD) {
    return NextResponse.json(
      { error: `Amount must be between $${MIN_AMOUNT_USD} and $${MAX_AMOUNT_USD}` },
      { status: 400 },
    );
  }

  const origin =
    request.headers.get('origin') ||
    `https://${request.headers.get('host')}` ||
    'https://itafakkur.com';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: recurring ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: recurring
                ? 'Monthly sadaqah — iTafakkur'
                : 'Sadaqah — iTafakkur',
              description:
                'A voluntary contribution to iTafakkur. No goods or services are exchanged.',
            },
            unit_amount: amount * 100,
            recurring: recurring ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?cancelled=1`,
      allow_promotion_codes: false,
      billing_address_collection: 'auto',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[checkout] session creation failed:', err);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 500 },
    );
  }
}
