/**
 * /99-names/[name] — per-name detail page.
 *
 * 99 SEO pages generated at build time. Each targets queries like
 * "Ar-Rahman meaning", "Al-Malik meaning", "Al-Ghafur", etc.
 *
 * Content: Arabic script (large, centered), transliteration, English
 * translation, meaning, prev/next navigation, and a CTA to the app.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ASMA_UL_HUSNA, getDivineName } from '@/data/asma-ul-husna';

export function generateStaticParams() {
  return ASMA_UL_HUSNA.map((n) => ({ name: n.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ name: string }> },
): Promise<Metadata> {
  const { name } = await params;
  const dn = getDivineName(name);
  if (!dn) return { title: 'Name not found' };
  return {
    title: `${dn.transliteration} — ${dn.translation}`,
    description: `${dn.transliteration} (${dn.arabic}) is the ${ordinal(dn.number)} of the 99 names of Allah, meaning "${dn.translation}". ${dn.meaning}`,
    openGraph: {
      title: `${dn.transliteration} — ${dn.translation}`,
      description: dn.meaning,
    },
  };
}

export default async function DivineNamePage(
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const dn = getDivineName(name);
  if (!dn) notFound();

  const prev = ASMA_UL_HUSNA.find((x) => x.number === dn.number - 1);
  const next = ASMA_UL_HUSNA.find((x) => x.number === dn.number + 1);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <nav className="mb-8 text-sm">
        <Link href="/99-names" className="text-muted hover:text-brown">
          ← All 99 names
        </Link>
      </nav>

      <div className="text-center mb-10">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-4">
          Name {dn.number} of 99
        </p>
        <p
          className="font-serif text-brown text-7xl sm:text-8xl mb-4"
          dir="rtl"
        >
          {dn.arabic}
        </p>
        <h1 className="font-serif text-brown text-4xl font-medium mb-2">
          {dn.transliteration}
        </h1>
        <p className="text-muted text-xl">{dn.translation}</p>
      </div>

      <div className="rounded-2xl border border-border bg-white/80 p-8 mb-10">
        <p className="text-brown text-lg leading-relaxed text-center">
          {dn.meaning}
        </p>
      </div>

      {/* Prev/Next */}
      <div className="flex items-center justify-between text-sm mb-10">
        {prev ? (
          <Link href={`/99-names/${prev.slug}`} className="text-muted hover:text-brown">
            ← {prev.transliteration}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/99-names/${next.slug}`} className="text-muted hover:text-brown">
            {next.transliteration} →
          </Link>
        ) : <span />}
      </div>

      {/* App CTA */}
      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
        <p className="text-brown text-sm mb-3">
          Reflect on the 99 Names of Allah with audio, translations, and daily
          reflections in the iTafakkur app.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Get iTafakkur
        </Link>
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${dn.transliteration} — ${dn.translation}`,
            about: 'The 99 Names of Allah',
            inLanguage: ['ar', 'en'],
          }),
        }}
      />
    </div>
  );
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
