/**
 * /donate/success — thank-you page after Stripe Checkout.
 */
import Link from 'next/link';
import type { Metadata } from 'next';
import { Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: false }, // don't index success pages
};

export default function DonateSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <Heart className="mx-auto mb-6 text-gold-dark" size={48} strokeWidth={1.5} />
      <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-4">
        Jazak Allahu khayran.
      </h1>
      <p className="text-brown text-lg mb-2">
        Your sadaqah has been received.
      </p>
      <p className="text-muted text-sm mb-10 leading-relaxed">
        A receipt is on its way to your email. Every contribution helps us
        serve more Muslims worldwide, ad-free and forever.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
      >
        Back to iTafakkur
      </Link>
    </div>
  );
}
