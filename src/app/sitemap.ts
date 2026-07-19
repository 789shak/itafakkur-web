/**
 * sitemap.xml — served at /sitemap.xml at runtime.
 *
 * Generated from our data files so it stays perfectly in sync with the
 * pages we actually ship. 280+ URLs total: home + prayer-times index +
 * 60 city pages + hijri + Quran index + 114 chapter pages + 99 Names
 * index + 99 name pages + daily + legal.
 *
 * `changeFrequency` reflects real update cadence — prayer times daily,
 * Quran text yearly (Quran text is fixed forever).
 */
import type { MetadataRoute } from 'next';
import { CITIES } from '@/data/cities';
import { QURAN_CHAPTERS } from '@/data/quran-chapters';
import { ASMA_UL_HUSNA } from '@/data/asma-ul-husna';

// Fallback used during preview builds; overridden by NEXT_PUBLIC_SITE_URL
// once we cut over to itafakkur.com in W8.
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://itafakkur.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                changeFrequency: 'weekly',  priority: 1.0, lastModified: now },
    { url: `${BASE}/prayer-times`,    changeFrequency: 'daily',   priority: 0.9, lastModified: now },
    { url: `${BASE}/hijri-calendar`,  changeFrequency: 'daily',   priority: 0.8, lastModified: now },
    { url: `${BASE}/quran`,           changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${BASE}/99-names`,        changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${BASE}/daily`,           changeFrequency: 'daily',   priority: 0.7, lastModified: now },
    { url: `${BASE}/download`,        changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE}/about`,           changeFrequency: 'monthly', priority: 0.5, lastModified: now },
    { url: `${BASE}/contact`,         changeFrequency: 'monthly', priority: 0.4, lastModified: now },
    { url: `${BASE}/privacy`,         changeFrequency: 'yearly',  priority: 0.3, lastModified: now },
    { url: `${BASE}/terms`,           changeFrequency: 'yearly',  priority: 0.3, lastModified: now },
  ];

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url:               `${BASE}/prayer-times/${c.slug}`,
    changeFrequency:   'daily',
    priority:          0.7,
    lastModified:      now,
  }));

  const surahPages: MetadataRoute.Sitemap = QURAN_CHAPTERS.map((c) => ({
    url:               `${BASE}/quran/${c.number}`,
    changeFrequency:   'yearly',
    priority:          0.8,
    lastModified:      now,
  }));

  const namePages: MetadataRoute.Sitemap = ASMA_UL_HUSNA.map((n) => ({
    url:               `${BASE}/99-names/${n.slug}`,
    changeFrequency:   'yearly',
    priority:          0.7,
    lastModified:      now,
  }));

  return [...staticPages, ...cityPages, ...surahPages, ...namePages];
}
