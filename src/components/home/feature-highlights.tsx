/**
 * FeatureHighlights — the homepage's "what's actually in here" section.
 *
 * The hero's FeatureOrbit is a discovery affordance (tap to reveal),
 * not an explanation — visitors who don't click it, or who land
 * without JS, get no sense of what iTafakkur does. This section gives
 * every feature a real sentence of context, using a 2-column list
 * instead of a 3-card row so it doesn't read as another generic
 * feature grid.
 *
 * All six link to real, existing routes — no placeholder hrefs.
 */
import Link from 'next/link';
import {
  Sun,
  BookOpen,
  Notebook,
  Flame,
  Moon,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

interface Item {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const ITEMS: Item[] = [
  {
    key: 'prayer-times',
    icon: Sun,
    title: 'Prayer times, wherever you are',
    description:
      "Fajr to Isha, calculated for your exact location, with adhan reminders you can actually rely on.",
    href: '/prayer-times',
  },
  {
    key: 'quran',
    icon: BookOpen,
    title: "The full Qur'an, offline",
    description:
      'All 114 surahs with scholar-vetted translations. Read or listen, with or without a connection.',
    href: '/quran',
  },
  {
    key: 'journal',
    icon: Notebook,
    title: 'A private place to reflect',
    description:
      "Your journal entries stay yours — not published, not analyzed, not sold. We store them so you can read them, nothing more.",
    href: '/journal',
  },
  {
    key: 'habits',
    icon: Flame,
    title: 'Habits that build quietly',
    description:
      'Fasting, dhikr, sadaqah — track the small, consistent actions without notification pressure or guilt.',
    href: '/habits',
  },
  {
    key: 'hijri',
    icon: Moon,
    title: 'Hijri calendar, done right',
    description:
      'Islamic dates that stay accurate, with the events and months that shape the year.',
    href: '/hijri-calendar',
  },
  {
    key: 'names',
    icon: Sparkles,
    title: '99 Names, explained',
    description:
      "Each of Allah's names with its meaning and context — not just a list, a place to sit with them.",
    href: '/99-names',
  },
];

export function FeatureHighlights() {
  return (
    <section className="relative py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-lg mb-14">
          <p className="text-[12px] font-semibold text-gold-dark uppercase tracking-[0.18em] mb-3">
            What&rsquo;s inside
          </p>
          <h2 className="font-serif text-brown text-3xl sm:text-4xl font-medium tracking-tight">
            One quiet app, not six loud ones.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2 border-b border-border/70">
          {ITEMS.map(({ key, icon: Icon, title, description, href }) => (
            <Link
              key={key}
              href={href}
              className="group flex items-start gap-4 py-6 border-t border-border/70 transition-colors hover:bg-white/50 -mx-4 px-4 rounded-xl"
            >
              <span className="mt-0.5 flex-shrink-0 w-11 h-11 rounded-2xl bg-gold/12 flex items-center justify-center group-hover:bg-gold/22 transition-colors">
                <Icon size={19} className="text-gold-dark" strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-1.5 font-serif text-brown text-[17px] font-medium">
                  {title}
                  <ArrowUpRight
                    size={15}
                    className="text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </span>
                <span className="block text-[14px] text-muted leading-relaxed mt-1.5 max-w-md">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
