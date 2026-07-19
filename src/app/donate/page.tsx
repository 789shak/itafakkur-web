/**
 * /donate — sadaqah page.
 *
 * Amount picker (preset chips + custom) + one-time / monthly toggle,
 * redirects to Stripe Checkout on submit. No user-facing card entry
 * on our site — Stripe handles PCI compliance entirely.
 */
'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';

const PRESETS = [5, 10, 25, 50, 100];

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount = custom ? Math.round(parseFloat(custom) || 0) : amount;

  const onDonate = async () => {
    setError(null);
    if (!effectiveAmount || effectiveAmount < 1) {
      setError('Please enter an amount of $1 or more.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: effectiveAmount, recurring }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Could not start checkout.');
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

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

      <div className="rounded-3xl border border-border bg-white/80 p-6 sm:p-10">
        {/* Amount */}
        <label className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-3 block">
          Amount (USD)
        </label>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {PRESETS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => { setAmount(v); setCustom(''); }}
              className={`h-11 rounded-full text-sm font-semibold transition-colors ${
                !custom && amount === v
                  ? 'bg-gold text-brown'
                  : 'bg-cream text-brown border border-border hover:border-gold/40'
              }`}
            >
              ${v}
            </button>
          ))}
        </div>
        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
          <input
            type="number"
            min={1}
            step={1}
            placeholder="Custom amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full h-11 pl-8 pr-4 rounded-full bg-white border border-border text-sm text-brown placeholder:text-muted focus:outline-none focus:border-gold"
          />
        </div>

        {/* Recurring toggle */}
        <label className="flex items-center gap-3 mb-8 cursor-pointer">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="w-4 h-4 accent-gold"
          />
          <span className="text-sm text-brown">
            Make this a monthly sadaqah
          </span>
        </label>

        {/* CTA */}
        <button
          type="button"
          onClick={onDonate}
          disabled={loading || !effectiveAmount}
          className="w-full h-12 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {recurring
            ? `Give $${effectiveAmount || 0} monthly`
            : `Give $${effectiveAmount || 0}`}
        </button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-700">{error}</p>
        )}

        <p className="mt-6 text-center text-xs text-muted">
          Secure checkout by Stripe. Card details never touch our servers.
        </p>
      </div>

      <p className="mt-10 text-center text-sm text-muted italic max-w-md mx-auto">
        &ldquo;The believer&rsquo;s shade on the Day of Resurrection will be his charity.&rdquo;
        <span className="not-italic"> — At-Tirmidhi 1954</span>
      </p>
    </div>
  );
}
