/**
 * /journal — read-only list view of journal entries (synced with mobile).
 *
 * Writing new entries on web is deferred to W6 (needs Client Component
 * form with server action). This first cut proves the sync — signing
 * in on the web shows the same entries you wrote on your phone.
 */
import Link from 'next/link';
import { requireAuth } from '@/lib/require-auth';
import { apiFetch } from '@/lib/api';

// Auth-gated — user-personal data must never share an ISR cache entry
// across users. force-dynamic guarantees per-request rendering.
export const dynamic = 'force-dynamic';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tags?: string[] | null;
  created_at: string;
}

export default async function JournalPage() {
  const session = await requireAuth();
  const entries = (await apiFetch<JournalEntry[]>('/journal', session)) || [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-10 flex items-baseline justify-between">
        <div>
          <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
            Your journal
          </p>
          <h1 className="font-serif text-brown text-4xl font-medium">Reflections</h1>
        </div>
        <Link href="/download" className="text-xs text-muted underline hover:text-brown">
          Write a new entry in the app →
        </Link>
      </header>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white/80 p-10 text-center">
          <p className="text-muted mb-4">No entries yet.</p>
          <p className="text-brown text-sm mb-6">
            Open the iTafakkur app on your phone, save a reflection on any verse
            you&rsquo;re reading, and it will sync here automatically.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center px-5 h-10 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
          >
            Get the app
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {entries.map((e) => {
            const verseTag = e.tags?.find((t) => t.startsWith('verse:'));
            const verseKey = verseTag?.slice('verse:'.length);
            return (
              <li key={e.id} className="rounded-2xl border border-border bg-white/80 p-6">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h2 className="font-serif text-brown text-xl">{e.title}</h2>
                  <time className="text-xs text-muted flex-shrink-0">
                    {new Date(e.created_at).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </time>
                </div>
                {verseKey && (
                  <p className="text-xs text-gold-dark mb-3">
                    On verse <Link href={`/quran/${verseKey.split(':')[0]}#${verseKey.split(':')[1]}`} className="underline">{verseKey}</Link>
                  </p>
                )}
                <p className="text-brown text-sm leading-relaxed whitespace-pre-wrap">
                  {e.content}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
