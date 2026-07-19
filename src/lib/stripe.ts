/**
 * Stripe SDK singleton for the backend (Route Handlers only).
 *
 * Reads STRIPE_SECRET_KEY at import time. Set both TEST and LIVE
 * versions in Vercel — TEST for previews, LIVE for production.
 *
 * Payment surface: Stripe Checkout (hosted redirect flow). Simpler
 * than the Payment Element for a MVP donation page — Stripe handles
 * card entry, Apple Pay, Google Pay, 3D Secure, receipts, all of it.
 */
import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY || '';

/**
 * `stripe` is null when the key is missing (dev/preview without Stripe
 * configured). Every consumer must null-check before use.
 */
export const stripe = key ? new Stripe(key, { apiVersion: '2025-06-30.basil' as Stripe.LatestApiVersion }) : null;
