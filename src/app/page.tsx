/**
 * Home page — Hero landing.
 *
 * Composed entirely of the <Hero /> component (client-heavy: R3F +
 * Framer Motion). The metadata below stays a Server Component
 * concern; the interactive scene is code-split so bots + slow
 * connections still get meaningful HTML on first paint.
 *
 * Below the hero: nothing else on this page — v1 keeps the landing
 * focused. Feature-specific SEO pages (per-verse Quran, per-city
 * prayer times, per-Name pages) live under their own routes.
 */
import type { Metadata } from 'next';
import { Hero } from '@/components/hero/hero';

export const metadata: Metadata = {
  title: 'iTafakkur — Your daily Muslim companion',
  description:
    "Accurate prayer times, the Qur'an with authentic translations, hadith from trusted sources, and space to reflect. No ads. No noise. Just what helps you draw closer.",
  openGraph: {
    title: 'iTafakkur',
    description: 'Your daily Muslim companion. Free, ad-free, private.',
    url: 'https://itafakkur.com',
  },
};

export default function HomePage() {
  return <Hero />;
}
