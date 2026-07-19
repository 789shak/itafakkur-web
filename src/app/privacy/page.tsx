/**
 * /privacy — privacy policy.
 *
 * Written in plain English. Covers what the app collects, why, who
 * we share with (Supabase, Aladhan, Quran.com for functionality;
 * Stripe for donations), user rights (delete/export), and contact.
 *
 * Effective date bumps when substantive changes ship. Small edits
 * (typos, clarifications) don't require a bump.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'iTafakkur privacy policy — what we collect, why, and your rights.',
};

const EFFECTIVE = 'July 19, 2026';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <h1 className="font-serif text-brown text-4xl font-medium tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm">Effective {EFFECTIVE}</p>
      </header>

      <div className="prose prose-brown max-w-none space-y-6 text-brown leading-relaxed">
        <p>
          iTafakkur is built to respect your privacy. We collect the minimum
          necessary to make the app work, we never sell your data, and we make
          it easy to delete everything at any time.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">What we collect</h2>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li><strong>Account details:</strong> email address (required), and if you provide it, your name.</li>
          <li><strong>Your content:</strong> journal entries, habits, dhikr counts, bookmarks, prayer preferences. Stored so you can read them across devices.</li>
          <li><strong>Location:</strong> used only to calculate prayer times and Qibla direction. We never store your GPS coordinates on our servers — they&rsquo;re sent to the prayer-times service (Aladhan) and immediately discarded.</li>
          <li><strong>Usage analytics:</strong> anonymous, aggregated. We use PostHog to understand which features are useful. Analytics identifiers are your randomly-generated Supabase user ID — never your email.</li>
          <li><strong>Crash reports:</strong> when the app crashes, technical details (device model, iOS/Android version, stack trace) are sent to Sentry so we can fix bugs. No personal content is included.</li>
        </ul>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Who we share with</h2>
        <p>We share only what&rsquo;s necessary for the app to function:</p>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li><strong>Supabase</strong> stores your account and content. Data is hosted in the EU with encryption at rest.</li>
          <li><strong>Aladhan</strong> receives your location to return prayer times. They do not receive any personal identifier.</li>
          <li><strong>Quran.com</strong> serves verse translations. They receive no personal information.</li>
          <li><strong>Resend</strong> delivers our welcome email and any support replies.</li>
          <li><strong>Stripe</strong> processes voluntary donations. Card details never touch our servers.</li>
          <li><strong>Apple and Google</strong> process App Store / Play Store purchases if you upgrade to Plus (in the mobile app).</li>
        </ul>
        <p>
          We do not sell, rent, or share your data with advertisers or data
          brokers. Ever.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Your rights</h2>
        <p>You can, at any time:</p>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li>Export your data (Profile → Data Export in the app).</li>
          <li>Delete your account and all associated data (Profile → Delete Account).</li>
          <li>Unsubscribe from our welcome or notification emails.</li>
          <li>Contact us with any privacy question.</li>
        </ul>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Children</h2>
        <p>
          iTafakkur is not designed for children under 13. If you believe we
          have collected data from a child under 13, please contact us and we
          will delete it immediately.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">International users</h2>
        <p>
          iTafakkur is operated from Saudi Arabia. By using the app, you agree
          to your information being transferred to servers in the EU and
          processed there. We comply with GDPR (EU), DPDP Act (India), and
          KSA Personal Data Protection Law.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Changes to this policy</h2>
        <p>
          If we materially change this policy, we&rsquo;ll update the effective date
          above and notify you in-app or by email.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Contact</h2>
        <p>
          Privacy questions:{' '}
          <a
            href="mailto:support.itafakkur@gmail.com"
            className="text-gold-dark underline"
          >
            support.itafakkur@gmail.com
          </a>
          . We respond within one business day.
        </p>
      </div>
    </div>
  );
}
