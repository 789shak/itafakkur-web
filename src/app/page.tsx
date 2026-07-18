/**
 * Home page — Week 1 placeholder.
 *
 * The real 3D hero (stylized mosque interior + radial feature reveal)
 * lands in Week 2. This placeholder proves the design system + fonts
 * + layout are wired end-to-end, and gives us a shareable staging URL
 * to demo to early testers.
 *
 * Motion: single subtle "breathing" scale on the accent dot. Everything
 * else is static. Respects prefers-reduced-motion via globals.css.
 */
export default function HomePage() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex items-center gap-2 mb-6">
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-gold animate-pulse"
        />
        <span className="text-[11px] font-semibold text-muted uppercase tracking-[0.18em]">
          Coming soon
        </span>
      </div>

      <h1 className="font-serif text-brown text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.05] mb-6 max-w-3xl">
        A quiet companion for your daily practice.
      </h1>

      <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
        Accurate prayer times. The Qur&apos;an with scholar-vetted
        translations. A moment to reflect. Launching this September.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href="/download"
          className="inline-flex items-center px-6 h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
        >
          Get the app now
        </a>
        <a
          href="mailto:support.itafakkur@gmail.com?subject=Notify%20me%20at%20launch"
          className="inline-flex items-center px-6 h-11 rounded-full border border-border text-brown text-sm font-medium hover:bg-white transition-colors"
        >
          Notify me at launch
        </a>
      </div>

      <p className="mt-16 text-[13px] text-muted italic max-w-md">
        &ldquo;Verily, in the remembrance of Allah do hearts find rest.&rdquo;
        <span className="not-italic"> — Qur&apos;an 13:28</span>
      </p>
    </section>
  );
}
