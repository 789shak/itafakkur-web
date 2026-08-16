/**
 * TrustBand — "why iTafakkur exists" in four claims.
 *
 * Copy is pulled directly from /about (the "What makes iTafakkur
 * different" section) rather than invented fresh, so the homepage
 * never promises something the rest of the site doesn't back up.
 *
 * Deliberately the one dark section on an otherwise cream site — uses
 * the same locked --brand-brown token as the page background rather
 * than an arbitrary new dark color, so it reads as "considered
 * contrast" instead of a copy-paste accident.
 */
import { ShieldCheck, EyeOff, Wallet, BadgeCheck } from 'lucide-react';

const CLAIMS = [
  {
    icon: ShieldCheck,
    title: 'No ads. Not now, not ever.',
    description: 'Your prayer times will never share screen space with a car insurance ad.',
  },
  {
    icon: EyeOff,
    title: 'No selling data',
    description: 'Your journal, habits, and reflections are yours. We store them so you can read them — nothing more.',
  },
  {
    icon: Wallet,
    title: 'Pay only for new value',
    description: "Everything the free tier does today, it still does tomorrow. We never gate what was once free.",
  },
  {
    icon: BadgeCheck,
    title: 'Scholar-vetted content',
    description: 'Translations from Saheeh International, Kemenag, and other established sources — not machine output.',
  },
];

export function TrustBand() {
  return (
    <section className="relative bg-brown py-20 sm:py-24 px-6 overflow-hidden">
      {/* Warm radial glow, echoing the hero's mihrab light so the dark
          section still feels like part of the same world rather than
          a different theme bolted on. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 500px at 50% 0%, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0) 60%)',
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-[12px] font-semibold text-gold uppercase tracking-[0.18em] mb-3 text-center">
          Built differently, on purpose
        </p>
        <h2 className="font-serif text-cream text-3xl sm:text-4xl font-medium tracking-tight text-center mb-14 max-w-xl mx-auto">
          Most Muslim apps optimize for engagement. We didn&rsquo;t want that.
        </h2>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {CLAIMS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="mt-0.5 flex-shrink-0 w-11 h-11 rounded-2xl bg-gold/15 flex items-center justify-center">
                <Icon size={19} className="text-gold" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-serif text-cream text-[17px] font-medium">{title}</p>
                <p className="text-[14px] text-cream/65 leading-relaxed mt-1.5 max-w-sm">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
