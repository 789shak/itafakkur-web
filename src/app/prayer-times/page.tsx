/**
 * /prayer-times — auto-detect visitor location, then render times.
 *
 * Client component: browser Geolocation API (permission-gated), falls
 * back to city picker if the user declines. Cache their choice in
 * localStorage so repeat visits skip the prompt.
 *
 * For SEO, the CITIES index links out to /prayer-times/[city] pages
 * which are pre-generated with ISR (see the [city] route).
 */
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { CITIES, REGION_LABELS, type City } from '@/data/cities';
import { formatTime12h, getPrayerTimes, type PrayerTimings, type DateInfo } from '@/lib/aladhan';

const LOCATION_KEY = 'itafakkur:prayer-location-v1';

type Location = { lat: number; lon: number; label: string };

export default function PrayerTimesPage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [times, setTimes] = useState<{ timings: PrayerTimings; date: DateInfo } | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionState, setPermissionState] = useState<'idle' | 'requesting' | 'denied' | 'granted'>('idle');
  const [query, setQuery] = useState('');

  // Restore last-chosen location on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCATION_KEY);
      if (raw) setLocation(JSON.parse(raw));
    } catch { /* silent */ }
  }, []);

  // Fetch times whenever location changes
  useEffect(() => {
    if (!location) return;
    setLoading(true);
    getPrayerTimes(location.lat, location.lon)
      .then(setTimes)
      .finally(() => setLoading(false));
  }, [location]);

  const persistLocation = useCallback((loc: Location) => {
    setLocation(loc);
    try { localStorage.setItem(LOCATION_KEY, JSON.stringify(loc)); } catch { /* silent */ }
  }, []);

  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setPermissionState('denied');
      return;
    }
    setPermissionState('requesting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPermissionState('granted');
        persistLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: 'Your location',
        });
      },
      () => setPermissionState('denied'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  }, [persistLocation]);

  const filteredCities = useMemo(() => {
    if (!query.trim()) return CITIES;
    const q = query.trim().toLowerCase();
    return CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.slug.includes(q),
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-brown text-4xl sm:text-5xl font-medium tracking-tight mb-3">
          Prayer Times
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto">
          Accurate salah times for anywhere in the world. Times are calculated
          using the Muslim World League method.
        </p>
      </header>

      {!location && (
        <div className="rounded-2xl border border-border bg-white/70 backdrop-blur-sm p-8 mb-10 text-center">
          <MapPin className="mx-auto mb-3 text-gold-dark" size={28} strokeWidth={1.75} />
          <h2 className="font-serif text-2xl text-brown mb-2">
            Where should we calculate times for?
          </h2>
          <p className="text-muted text-sm mb-6 max-w-md mx-auto">
            Share your location for the fastest experience, or pick a city
            from the list below.
          </p>
          <button
            onClick={requestGeolocation}
            disabled={permissionState === 'requesting'}
            className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors disabled:opacity-50"
          >
            <MapPin size={16} />
            {permissionState === 'requesting' ? 'Detecting…' : 'Use my location'}
          </button>
          {permissionState === 'denied' && (
            <p className="mt-4 text-xs text-muted">
              Location declined. Pick a city below instead.
            </p>
          )}
        </div>
      )}

      {location && times && (
        <div className="rounded-2xl border border-border bg-white/80 p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-brown">{location.label}</h2>
              <p className="text-muted text-sm">
                {times.date.readable} · {times.date.hijri.day} {times.date.hijri.month.en} {times.date.hijri.year} AH
              </p>
            </div>
            <button
              onClick={() => {
                setLocation(null);
                setTimes(null);
                try { localStorage.removeItem(LOCATION_KEY); } catch { /* silent */ }
              }}
              className="text-xs text-muted hover:text-brown underline"
            >
              Change
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((name) => (
              <div key={name} className="text-center">
                <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                  {name}
                </p>
                <p className="font-serif text-2xl text-brown">
                  {formatTime12h(times.timings[name])}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && location && !times && (
        <div className="text-center text-muted mb-10">Loading prayer times…</div>
      )}

      {/* City picker + directory */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search a city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-full bg-white border border-border text-sm text-brown placeholder:text-muted focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="space-y-8">
        {Array.from(new Set(filteredCities.map((c) => c.region))).map((region) => (
          <div key={region}>
            <h3 className="text-[12px] font-semibold text-brown uppercase tracking-wider mb-3">
              {REGION_LABELS[region]}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredCities.filter((c) => c.region === region).map((c: City) => (
                <Link
                  key={c.slug}
                  href={`/prayer-times/${c.slug}`}
                  className="px-3 py-2 rounded-lg text-sm text-brown hover:bg-white hover:border-gold/40 border border-transparent transition-colors"
                >
                  {c.name}
                  <span className="text-muted text-xs ml-1">· {c.country}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
