/**
 * /about — mission + story + values.
 */
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About iTafakkur',
  description:
    'iTafakkur is a Muslim companion app built with intention. No ads, no data selling, no noise — just what helps you draw closer.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-12 text-center">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-3">
          Our story
        </p>
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight">
          Built with intention.
        </h1>
      </header>

      <div className="prose prose-brown max-w-none space-y-6 text-brown text-lg leading-relaxed">
        <p>
          iTafakkur means <em>&ldquo;I reflect&rdquo;</em>. It&rsquo;s a quiet daily companion —
          not another notification-heavy productivity app dressed in religious
          clothes, but a place to pause, remember, and return.
        </p>
        <p>
          We built iTafakkur because we couldn&rsquo;t find one that felt right. The
          major Muslim apps are packed with ads. Some sell user data. Others
          gate essential features behind expensive subscriptions. And most of
          them treat prayer times and the Qur&rsquo;an as content to be optimized for
          engagement, not honored for what they are.
        </p>
        <p>
          So we built ours differently.
        </p>

        <h2 className="font-serif text-brown text-2xl font-medium mt-10 mb-4">
          What makes iTafakkur different
        </h2>
        <ul className="space-y-3 text-base pl-4 list-disc marker:text-gold-dark">
          <li><strong>No ads. Not now. Not ever.</strong> Your prayer times will never share screen space with a car insurance ad.</li>
          <li><strong>No selling data.</strong> Your journal, your habits, your reflections — they&rsquo;re yours. We store them so you can read them; we do not analyze them, sell them, or share them.</li>
          <li><strong>Pay only for new value.</strong> Everything the free tier does today, it will still do for free tomorrow. If we ever add a Plus tier, it&rsquo;s for new features on top — never gating what was once free.</li>
          <li><strong>Scholar-vetted content.</strong> Translations from Saheeh International, Kemenag, Junagarhi, Sheikh Mujibur Rahman. Hadith from Sahih Bukhari and Muslim. No shortcuts.</li>
          <li><strong>Open on faith questions we can&rsquo;t answer.</strong> When there&rsquo;s scholarly disagreement, we present options. We don&rsquo;t pretend Islam is monolithic.</li>
        </ul>

        <h2 className="font-serif text-brown text-2xl font-medium mt-10 mb-4">
          How we&rsquo;re funded
        </h2>
        <p>
          iTafakkur is bootstrapped and independent. No VC, no ads. When we
          eventually offer a Plus tier for advanced features (AI Search
          Qur&rsquo;an with unlimited use, richer widgets, deeper analytics), it
          will help sustain the free tier for everyone else. Until then,
          the app is bootstrapped from the founder&rsquo;s own resources.
        </p>

        <h2 className="font-serif text-brown text-2xl font-medium mt-10 mb-4">
          Get in touch
        </h2>
        <p>
          Questions, feedback, or corrections on the content? Write to us at{' '}
          <a
            href="mailto:support.itafakkur@gmail.com"
            className="text-gold-dark underline"
          >
            support.itafakkur@gmail.com
          </a>
          . Every message is read by a real person — usually within a day.
        </p>
      </div>
    </div>
  );
}
