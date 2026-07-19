/**
 * /terms — terms of use.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'iTafakkur terms of use.',
};

const EFFECTIVE = 'July 19, 2026';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <h1 className="font-serif text-brown text-4xl font-medium tracking-tight mb-2">
          Terms of Use
        </h1>
        <p className="text-muted text-sm">Effective {EFFECTIVE}</p>
      </header>

      <div className="prose prose-brown max-w-none space-y-6 text-brown leading-relaxed">
        <p>
          Welcome to iTafakkur. These terms describe what you can expect from
          us, and what we ask of you in return. By using iTafakkur — the app,
          the website, or both — you agree to these terms.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">The service</h2>
        <p>
          iTafakkur provides prayer times, the Qur&rsquo;an with translations,
          hadith from authentic sources, a journal, a habit tracker, and other
          tools intended to support your daily practice as a Muslim.
        </p>
        <p>
          Core features are free. Advanced features may be offered as a paid
          &ldquo;Plus&rdquo; tier in the mobile app. If we add a Plus tier, we will never
          remove a feature from the free tier that was previously included.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Your account</h2>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li>You must be at least 13 years old to create an account.</li>
          <li>Keep your login credentials confidential. You are responsible for activity on your account.</li>
          <li>You may delete your account at any time. When you do, we permanently delete your data within 30 days.</li>
        </ul>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Content and use</h2>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li>Qur&rsquo;anic text is drawn from the Uthmani script and is faithfully reproduced. Translations are sourced from established scholars (Saheeh International, Kemenag, Junagarhi, and others).</li>
          <li>Hadith are drawn from the recognized collections (Sahih Bukhari, Sahih Muslim, and others). We indicate authenticity where relevant.</li>
          <li>You may share content from iTafakkur — a verse, a hadith, a du&rsquo;a — freely, with attribution where appropriate.</li>
          <li>You may not use iTafakkur to spread hate, promote violence, or mislead others about the Qur&rsquo;an or Sunnah.</li>
        </ul>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Voluntary contributions</h2>
        <p>
          Sadaqah given through iTafakkur is a voluntary contribution. No
          goods, services, or account benefits are provided in exchange.
          Contributions are non-refundable except where required by law.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Subscription (mobile Plus)</h2>
        <p>
          If you subscribe to iTafakkur Plus in the mobile app, billing is
          handled by Apple or Google. You can cancel any time in your device
          settings. Refunds are subject to their policies.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Third-party services</h2>
        <p>
          iTafakkur relies on third-party services (Supabase for storage,
          Aladhan for prayer times, Quran.com for translations, Stripe for
          donations, Apple / Google for app distribution). Their terms and
          privacy policies apply to their portion of the service.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Warranty and liability</h2>
        <p>
          iTafakkur is provided &ldquo;as is,&rdquo; without warranty of any kind. Prayer
          times are calculated to our best ability using the Aladhan API, but
          you are responsible for your own worship. To the fullest extent
          permitted by law, we disclaim liability for any damages arising from
          your use of the service.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Termination</h2>
        <p>
          We may suspend or terminate your account if you materially breach
          these terms. You may stop using iTafakkur at any time.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Governing law</h2>
        <p>
          These terms are governed by the laws of the Kingdom of Saudi
          Arabia. Any disputes will be resolved in the competent courts of
          Riyadh, without prejudice to any protections you have under your
          local consumer law.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Contact</h2>
        <p>
          Questions?{' '}
          <a
            href="mailto:support.itafakkur@gmail.com"
            className="text-gold-dark underline"
          >
            support.itafakkur@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
