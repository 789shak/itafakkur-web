/**
 * /donate — sadaqah page.
 *
 * Uses LaunchGood as the donation platform (Muslim-focused, no entity
 * required, works globally for KSA-based individual). Once Alfie's
 * LaunchGood campaign is created, replace LAUNCHGOOD_URL below with
 * the actual campaign URL.
 *
 * We deliberately do NOT collect card details on our site — LaunchGood
 * handles PCI compliance, receipts, tax documentation (where applicable),
 * and Zakat eligibility marking.
 */
import type { Metadata } from 'next';
import { Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sadaqah — Support iTafakkur',
  description:
    'iTafakkur is free forever. If it has benefited you, your voluntary sadaqah keeps the app ad-free and helps us serve more Muslims worldwide.',
  openGraph: {
    title: 'Support iTafakkur',
    description: 'Ad-free, forever. Your sadaqah keeps it that way.',
  },
};

// Replace with your actual LaunchGood campaign URL once created.
// Until then, this points to LaunchGood's home so the button still
// works — visitors just land on the platform rather than your page.
const LAUNCHGOOD_URL = 'https://www.launchgood.com';

export default function DonatePage() {
  const campaignReady = LAUNCHGOOD_URL !== 'https://www.launchgood.com';

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <header className="text-center mb-10">
        <Heart className="mx-auto mb-4 text-gold-dark" size={32} strokeWidth={1.5} />
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-3">
          Sadaqah
        </h1>
        <p className="text-muted text-base max-w-lg mx-auto leading-relaxed">
          iTafakkur is free forever. If it has benefited you, your voluntary
          sadaqah helps us serve more Muslims worldwide. Every contribution
          keeps the app ad-free.
        </p>
      </header>

      <div className="rounded-3xl border border-border bg-white/80 p-8 sm:p-10 mb-10">
        <div className="text-center mb-8">
          <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.22em] mb-3">
            Give via LaunchGood
          </p>
          <p className="text-brown text-base leading-relaxed max-w-md mx-auto">
            We use LaunchGood — the trusted global platform for Muslim causes.
            Donate securely with any card, Apple Pay, or Google Pay. Zakat-
            eligible marking, receipts, and recurring options included.
          </p>
        </div>

        <a
          href={LAUNCHGOOD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          <Heart size={16} strokeWidth={1.75} />
          {campaignReady ? 'Give sadaqah on LaunchGood' : 'Support iTafakkur on LaunchGood'}
        </a>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted">
          <div className="p-3 rounded-lg bg-cream">
            <p className="font-semibold text-brown text-sm mb-1">Global</p>
            <p>Any currency, any country</p>
          </div>
          <div className="p-3 rounded-lg bg-cream">
            <p className="font-semibold text-brown text-sm mb-1">Zakat-ready</p>
            <p>Marked eligible where applicable</p>
          </div>
          <div className="p-3 rounded-lg bg-cream">
            <p className="font-semibold text-brown text-sm mb-1">Secure</p>
            <p>PCI-compliant checkout</p>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-muted italic max-w-md mx-auto">
        &ldquo;The believer&rsquo;s shade on the Day of Resurrection will be his charity.&rdquo;
        <span className="not-italic"> — At-Tirmidhi 1954</span>
      </p>
    </div>
  );
}
