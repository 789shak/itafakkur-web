/**
 * Hero — the composite landing section.
 *
 * Layout stack:
 *   1. MosqueScene (full-bleed R3F canvas, absolute-positioned)
 *   2. Cream-to-transparent gradient overlay (readability)
 *   3. FeatureOrbit (HTML overlay — wordmark + radial cards)
 *   4. Below-fold: quote + secondary CTAs
 *
 * The 3D canvas is loaded LAZILY via next/dynamic so:
 *   - Server-side render emits placeholder HTML (SEO-safe)
 *   - Three.js only ships to browsers that reach this page
 *   - First Contentful Paint isn't blocked by ~350KB of R3F/three
 *
 * The scroll-trigger for auto-opening the FeatureOrbit uses
 * IntersectionObserver — cheap, no scroll listener needed.
 */
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { FeatureOrbit } from './feature-orbit';

// Dynamic import — R3F only loads client-side.
const MosqueScene = dynamic(
  () => import('./mosque-scene').then((m) => m.MosqueScene),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.10) 0%, rgba(248,245,239,0) 60%)',
        }}
      />
    ),
  },
);

export function Hero() {
  const [scrolledIn, setScrolledIn] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Auto-open the feature orbit once the user has scrolled the hero
  // past ~30% of viewport height. Uses IntersectionObserver so we don't
  // pay a scroll-listener cost on every frame.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setScrolledIn(true);
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sentinelRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* 3D scene — absolutely positioned behind the HTML overlay */}
      <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <MosqueScene />
      </div>

      {/* Cream gradient overlay for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(248,245,239,0.4) 0%, rgba(248,245,239,0.15) 40%, rgba(248,245,239,0.75) 100%)',
        }}
      />

      {/* HTML overlay — wordmark + radial reveal */}
      <div className="relative z-10">
        <FeatureOrbit autoOpen={scrolledIn} />
      </div>

      {/* Below-fold — quote + secondary CTA */}
      <div className="relative z-10 pb-20 px-6 text-center">
        <p className="mt-4 text-[14px] text-muted italic max-w-md mx-auto">
          &ldquo;Verily, in the remembrance of Allah do hearts find rest.&rdquo;
          <span className="not-italic"> — Qur&apos;an 13:28</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <a
            href="/download"
            className="inline-flex items-center px-6 h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
          >
            Get the app
          </a>
          <a
            href="mailto:support.itafakkur@gmail.com?subject=Feedback"
            className="inline-flex items-center px-6 h-11 rounded-full border border-border text-brown text-sm font-medium hover:bg-white transition-colors"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
