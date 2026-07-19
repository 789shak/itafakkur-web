/**
 * FeatureOrbit — six feature cards fanning out radially from the
 * center iTafakkur wordmark on click or scroll trigger.
 *
 * States:
 *   'closed' — cards hidden behind logo, only wordmark + hint visible
 *   'open'   — cards translated outward in a hexagon around logo, each
 *              tappable and linking to the corresponding page
 *
 * Trigger:
 *   - Click the center wordmark (primary interaction)
 *   - Scroll past the hero section (auto-opens)
 *   - `prefers-reduced-motion` — opens immediately with no stagger
 *
 * Uses Framer Motion for the fan-out choreography. Each card animates
 * with a small delay based on its orbit index so the reveal feels
 * radial rather than uniform.
 */
'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useState } from 'react';
import {
  Search,
  Sun,
  BookOpen,
  Notebook,
  Flame,
  User,
  type LucideIcon,
} from 'lucide-react';

interface Feature {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Angle in degrees from the top (12 o'clock), clockwise. */
  angleDeg: number;
}

// Six features arranged as a hexagon around the center wordmark.
// Order chosen so the top slot is "Guidance" (the mobile app's home
// tab), matching the "start here" intent. Search Quran sits at 2
// o'clock as the second-most-discoverable slot.
const FEATURES: Feature[] = [
  { key: 'guidance', label: 'Guidance',     href: '/prayer-times',   icon: Sun,      angleDeg:   0 },
  { key: 'search',   label: 'Search Quran', href: '/download',       icon: Search,   angleDeg:  60 },
  { key: 'study',    label: 'Study',        href: '/quran',          icon: BookOpen, angleDeg: 120 },
  { key: 'journal',  label: 'Journal',      href: '/download',       icon: Notebook, angleDeg: 180 },
  { key: 'habits',   label: 'Habits',       href: '/download',       icon: Flame,    angleDeg: 240 },
  { key: 'profile',  label: 'Profile',      href: '/download',       icon: User,     angleDeg: 300 },
];

// Radius of the orbit in pixels — visible only on md+ screens. On
// mobile the layout collapses to a vertical stack (handled in CSS).
const ORBIT_RADIUS = 220;

interface Props {
  /**
   * External open trigger — the parent Hero passes `true` when the
   * user has scrolled past the fold, so cards reveal even without
   * clicking. Overrides the internal click state.
   */
  autoOpen?: boolean;
}

export function FeatureOrbit({ autoOpen = false }: Props) {
  const reduceMotion = useReducedMotion();
  const [manualOpen, setManualOpen] = useState(false);
  const open = manualOpen || autoOpen;

  const toggle = useCallback(() => setManualOpen((v) => !v), []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[600px] md:min-h-[720px] py-16">
      {/* Center wordmark — the "click here to explore" affordance */}
      <motion.button
        type="button"
        onClick={toggle}
        className="relative z-20 flex flex-col items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream rounded-full"
        aria-expanded={open}
        aria-label={open ? 'Close feature reveal' : 'Explore iTafakkur features'}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.span
          aria-hidden="true"
          className="block w-2 h-2 rounded-full bg-gold"
          animate={reduceMotion ? undefined : { scale: [1, 1.4, 1] }}
          transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <h1
          className="font-serif text-brown text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-center"
          style={{
            // Cream halo — lifts the wordmark off the 3D scene without
            // altering its color or vibe. Barely visible on plain cream,
            // pronounced when the mihrab glow behind it warms the cream.
            textShadow:
              '0 1px 24px rgba(248,245,239,0.95), 0 0 48px rgba(248,245,239,0.7), 0 2px 4px rgba(58,40,18,0.08)',
          }}
        >
          iTafakkur
        </h1>
        <span className="text-[11px] font-semibold text-muted uppercase tracking-[0.22em] mt-1">
          {open ? 'Tap again to close' : 'Tap to explore'}
        </span>
      </motion.button>

      {/* Radial feature cards — visible only on md+ (desktop-hero
          per spec). Mobile falls back to a vertical stack below. */}
      <div
        aria-hidden={!open}
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {FEATURES.map((f, i) => {
          const rad = (f.angleDeg - 90) * (Math.PI / 180); // -90 so 0° is at top
          const x = Math.cos(rad) * ORBIT_RADIUS;
          const y = Math.sin(rad) * ORBIT_RADIUS;
          const Icon = f.icon;

          return (
            <motion.div
              key={f.key}
              className="absolute top-1/2 left-1/2"
              initial={false}
              animate={{
                x: open ? x : 0,
                y: open ? y : 0,
                opacity: open ? 1 : 0,
                scale: open ? 1 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 18,
                delay: open && !reduceMotion ? i * 0.06 : 0,
              }}
              style={{ translateX: '-50%', translateY: '-50%', pointerEvents: open ? 'auto' : 'none' }}
            >
              <Link
                href={f.href}
                className="group flex flex-col items-center gap-2 w-28 py-4 px-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-border shadow-[0_2px_16px_rgba(58,40,18,0.04)] hover:shadow-[0_4px_24px_rgba(58,40,18,0.10)] hover:border-gold/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold-dark" strokeWidth={1.75} />
                </span>
                <span className="text-[13px] font-medium text-brown">{f.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile / small-screen fallback — vertical stack, always visible.
          Ships CTA content even if JS-heavy 3D never loads. */}
      <div className="md:hidden mt-10 grid grid-cols-2 gap-3 w-full max-w-sm px-4">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.key}
              href={f.href}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl bg-white/80 border border-border"
            >
              <span className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
                <Icon size={16} className="text-gold-dark" strokeWidth={1.75} />
              </span>
              <span className="text-[13px] font-medium text-brown">{f.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
