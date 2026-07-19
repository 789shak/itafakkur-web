/**
 * /99-names — index page for Asma-ul-Husna.
 *
 * Server-rendered grid of all 99 names. Each links to /99-names/[slug]
 * for a full detail page (99 SEO pages total).
 *
 * SEO: title and description target the top query for this topic
 * ("99 names of Allah" gets ~500K monthly searches per SEMrush).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ASMA_UL_HUSNA } from '@/data/asma-ul-husna';

export const metadata: Metadata = {
  title: 'The 99 Names of Allah (Asma-ul-Husna)',
  description:
    'All 99 names of Allah (Asma-ul-Husna) with Arabic script, transliteration, English translation, and meanings. Ar-Rahman, Ar-Raheem, Al-Malik, and every name of the Most High.',
  openGraph: {
    title: 'The 99 Names of Allah',
    description: 'Asma-ul-Husna — 99 beautiful names of Allah with meanings.',
  },
};

export default function AsmaUlHusnaIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="text-center mb-10">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-4">
          Asma-ul-Husna
        </p>
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-3">
          The 99 Names of Allah
        </h1>
        <p className="text-muted text-base max-w-2xl mx-auto">
          Allah has ninety-nine names. Whoever memorizes them all by heart will
          enter Paradise. <span className="text-xs">— Sahih al-Bukhari 2736</span>
        </p>
      </header>

      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ASMA_UL_HUSNA.map((name) => (
          <li key={name.number}>
            <Link
              href={`/99-names/${name.slug}`}
              className="block p-4 rounded-xl bg-white/80 border border-border hover:border-gold/40 hover:shadow-[0_2px_16px_rgba(58,40,18,0.06)] transition-all"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-brown font-serif text-xs">
                  {name.number}
                </span>
                <span className="font-serif text-brown text-2xl" dir="rtl">
                  {name.arabic}
                </span>
              </div>
              <p className="font-serif text-brown text-lg leading-tight">
                {name.transliteration}
              </p>
              <p className="text-muted text-xs mt-1">{name.translation}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
