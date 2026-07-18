/**
 * Top cities for pre-generated prayer-times SEO pages.
 *
 * Selection criteria:
 *   1. Muslim-majority or significant Muslim population
 *   2. Metro-area population >500K OR strategic religious significance
 *   3. Cover the target markets from the app strategy — US, UK, EU,
 *      Indonesia, India, Muslim-population Asia
 *
 * Not exhaustive at 60 cities — we'll expand to 200+ post-launch based
 * on Search Console data (add cities users search for that we don't
 * have pages for).
 *
 * Slugs are URL-safe lowercase-with-hyphens, chosen to match natural
 * search queries: "prayer-times-riyadh", "prayer-times-new-york", etc.
 *
 * Coordinates are city center — Aladhan handles the timezone lookup
 * from lat/lon internally.
 */

export interface City {
  slug: string;
  name: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  lat: number;
  lon: number;
  /** Region grouping for the index page. */
  region: 'gcc' | 'levant' | 'north-africa' | 'south-asia' | 'southeast-asia' | 'europe' | 'north-america' | 'sub-saharan-africa' | 'oceania';
}

export const CITIES: City[] = [
  // GCC & Arabian Peninsula
  { slug: 'makkah',        name: 'Makkah',        country: 'Saudi Arabia', countryCode: 'SA', lat: 21.4225, lon: 39.8262, region: 'gcc' },
  { slug: 'madinah',       name: 'Madinah',       country: 'Saudi Arabia', countryCode: 'SA', lat: 24.4686, lon: 39.6142, region: 'gcc' },
  { slug: 'riyadh',        name: 'Riyadh',        country: 'Saudi Arabia', countryCode: 'SA', lat: 24.7136, lon: 46.6753, region: 'gcc' },
  { slug: 'jeddah',        name: 'Jeddah',        country: 'Saudi Arabia', countryCode: 'SA', lat: 21.4858, lon: 39.1925, region: 'gcc' },
  { slug: 'dubai',         name: 'Dubai',         country: 'UAE',          countryCode: 'AE', lat: 25.2048, lon: 55.2708, region: 'gcc' },
  { slug: 'abu-dhabi',     name: 'Abu Dhabi',     country: 'UAE',          countryCode: 'AE', lat: 24.4539, lon: 54.3773, region: 'gcc' },
  { slug: 'sharjah',       name: 'Sharjah',       country: 'UAE',          countryCode: 'AE', lat: 25.3463, lon: 55.4209, region: 'gcc' },
  { slug: 'doha',          name: 'Doha',          country: 'Qatar',        countryCode: 'QA', lat: 25.2854, lon: 51.5310, region: 'gcc' },
  { slug: 'kuwait-city',   name: 'Kuwait City',   country: 'Kuwait',       countryCode: 'KW', lat: 29.3759, lon: 47.9774, region: 'gcc' },
  { slug: 'manama',        name: 'Manama',        country: 'Bahrain',      countryCode: 'BH', lat: 26.2285, lon: 50.5860, region: 'gcc' },
  { slug: 'muscat',        name: 'Muscat',        country: 'Oman',         countryCode: 'OM', lat: 23.5859, lon: 58.4059, region: 'gcc' },

  // Levant & Middle East
  { slug: 'jerusalem',     name: 'Jerusalem',     country: 'Palestine',    countryCode: 'PS', lat: 31.7683, lon: 35.2137, region: 'levant' },
  { slug: 'amman',         name: 'Amman',         country: 'Jordan',       countryCode: 'JO', lat: 31.9454, lon: 35.9284, region: 'levant' },
  { slug: 'beirut',        name: 'Beirut',        country: 'Lebanon',      countryCode: 'LB', lat: 33.8938, lon: 35.5018, region: 'levant' },
  { slug: 'damascus',      name: 'Damascus',      country: 'Syria',        countryCode: 'SY', lat: 33.5138, lon: 36.2765, region: 'levant' },
  { slug: 'baghdad',       name: 'Baghdad',       country: 'Iraq',         countryCode: 'IQ', lat: 33.3152, lon: 44.3661, region: 'levant' },
  { slug: 'istanbul',      name: 'Istanbul',      country: 'Turkey',       countryCode: 'TR', lat: 41.0082, lon: 28.9784, region: 'levant' },
  { slug: 'ankara',        name: 'Ankara',        country: 'Turkey',       countryCode: 'TR', lat: 39.9334, lon: 32.8597, region: 'levant' },

  // North Africa
  { slug: 'cairo',         name: 'Cairo',         country: 'Egypt',        countryCode: 'EG', lat: 30.0444, lon: 31.2357, region: 'north-africa' },
  { slug: 'alexandria',    name: 'Alexandria',    country: 'Egypt',        countryCode: 'EG', lat: 31.2001, lon: 29.9187, region: 'north-africa' },
  { slug: 'casablanca',    name: 'Casablanca',    country: 'Morocco',      countryCode: 'MA', lat: 33.5731, lon: -7.5898, region: 'north-africa' },
  { slug: 'rabat',         name: 'Rabat',         country: 'Morocco',      countryCode: 'MA', lat: 34.0209, lon: -6.8416, region: 'north-africa' },
  { slug: 'algiers',       name: 'Algiers',       country: 'Algeria',      countryCode: 'DZ', lat: 36.7538, lon:  3.0588, region: 'north-africa' },
  { slug: 'tunis',         name: 'Tunis',         country: 'Tunisia',      countryCode: 'TN', lat: 36.8065, lon: 10.1815, region: 'north-africa' },

  // South Asia
  { slug: 'karachi',       name: 'Karachi',       country: 'Pakistan',     countryCode: 'PK', lat: 24.8607, lon: 67.0011, region: 'south-asia' },
  { slug: 'lahore',        name: 'Lahore',        country: 'Pakistan',     countryCode: 'PK', lat: 31.5497, lon: 74.3436, region: 'south-asia' },
  { slug: 'islamabad',     name: 'Islamabad',     country: 'Pakistan',     countryCode: 'PK', lat: 33.6844, lon: 73.0479, region: 'south-asia' },
  { slug: 'dhaka',         name: 'Dhaka',         country: 'Bangladesh',   countryCode: 'BD', lat: 23.8103, lon: 90.4125, region: 'south-asia' },
  { slug: 'chittagong',    name: 'Chittagong',    country: 'Bangladesh',   countryCode: 'BD', lat: 22.3569, lon: 91.7832, region: 'south-asia' },
  { slug: 'delhi',         name: 'Delhi',         country: 'India',        countryCode: 'IN', lat: 28.6139, lon: 77.2090, region: 'south-asia' },
  { slug: 'mumbai',        name: 'Mumbai',        country: 'India',        countryCode: 'IN', lat: 19.0760, lon: 72.8777, region: 'south-asia' },
  { slug: 'hyderabad',     name: 'Hyderabad',     country: 'India',        countryCode: 'IN', lat: 17.3850, lon: 78.4867, region: 'south-asia' },
  { slug: 'kolkata',       name: 'Kolkata',       country: 'India',        countryCode: 'IN', lat: 22.5726, lon: 88.3639, region: 'south-asia' },
  { slug: 'bangalore',     name: 'Bangalore',     country: 'India',        countryCode: 'IN', lat: 12.9716, lon: 77.5946, region: 'south-asia' },
  { slug: 'chennai',       name: 'Chennai',       country: 'India',        countryCode: 'IN', lat: 13.0827, lon: 80.2707, region: 'south-asia' },

  // Southeast Asia
  { slug: 'jakarta',       name: 'Jakarta',       country: 'Indonesia',    countryCode: 'ID', lat: -6.2088, lon: 106.8456, region: 'southeast-asia' },
  { slug: 'surabaya',      name: 'Surabaya',      country: 'Indonesia',    countryCode: 'ID', lat: -7.2575, lon: 112.7521, region: 'southeast-asia' },
  { slug: 'bandung',       name: 'Bandung',       country: 'Indonesia',    countryCode: 'ID', lat: -6.9175, lon: 107.6191, region: 'southeast-asia' },
  { slug: 'medan',         name: 'Medan',         country: 'Indonesia',    countryCode: 'ID', lat:  3.5952, lon:  98.6722, region: 'southeast-asia' },
  { slug: 'kuala-lumpur',  name: 'Kuala Lumpur',  country: 'Malaysia',     countryCode: 'MY', lat:  3.1390, lon: 101.6869, region: 'southeast-asia' },

  // Europe
  { slug: 'london',        name: 'London',        country: 'UK',           countryCode: 'GB', lat: 51.5074, lon: -0.1278, region: 'europe' },
  { slug: 'birmingham',    name: 'Birmingham',    country: 'UK',           countryCode: 'GB', lat: 52.4862, lon: -1.8904, region: 'europe' },
  { slug: 'manchester',    name: 'Manchester',    country: 'UK',           countryCode: 'GB', lat: 53.4808, lon: -2.2426, region: 'europe' },
  { slug: 'paris',         name: 'Paris',         country: 'France',       countryCode: 'FR', lat: 48.8566, lon:  2.3522, region: 'europe' },
  { slug: 'marseille',     name: 'Marseille',     country: 'France',       countryCode: 'FR', lat: 43.2965, lon:  5.3698, region: 'europe' },
  { slug: 'berlin',        name: 'Berlin',        country: 'Germany',      countryCode: 'DE', lat: 52.5200, lon: 13.4050, region: 'europe' },
  { slug: 'amsterdam',     name: 'Amsterdam',     country: 'Netherlands',  countryCode: 'NL', lat: 52.3676, lon:  4.9041, region: 'europe' },
  { slug: 'brussels',      name: 'Brussels',      country: 'Belgium',      countryCode: 'BE', lat: 50.8503, lon:  4.3517, region: 'europe' },

  // North America
  { slug: 'new-york',      name: 'New York',      country: 'USA',          countryCode: 'US', lat: 40.7128, lon: -74.0060, region: 'north-america' },
  { slug: 'chicago',       name: 'Chicago',       country: 'USA',          countryCode: 'US', lat: 41.8781, lon: -87.6298, region: 'north-america' },
  { slug: 'los-angeles',   name: 'Los Angeles',   country: 'USA',          countryCode: 'US', lat: 34.0522, lon: -118.2437, region: 'north-america' },
  { slug: 'houston',       name: 'Houston',       country: 'USA',          countryCode: 'US', lat: 29.7604, lon: -95.3698, region: 'north-america' },
  { slug: 'washington-dc', name: 'Washington DC', country: 'USA',          countryCode: 'US', lat: 38.9072, lon: -77.0369, region: 'north-america' },
  { slug: 'toronto',       name: 'Toronto',       country: 'Canada',       countryCode: 'CA', lat: 43.6532, lon: -79.3832, region: 'north-america' },

  // Sub-Saharan Africa
  { slug: 'lagos',         name: 'Lagos',         country: 'Nigeria',      countryCode: 'NG', lat:  6.5244, lon:  3.3792, region: 'sub-saharan-africa' },
  { slug: 'kano',          name: 'Kano',          country: 'Nigeria',      countryCode: 'NG', lat: 12.0022, lon:  8.5920, region: 'sub-saharan-africa' },
  { slug: 'nairobi',       name: 'Nairobi',       country: 'Kenya',        countryCode: 'KE', lat: -1.2921, lon: 36.8219, region: 'sub-saharan-africa' },
  { slug: 'dar-es-salaam', name: 'Dar es Salaam', country: 'Tanzania',     countryCode: 'TZ', lat: -6.7924, lon: 39.2083, region: 'sub-saharan-africa' },
  { slug: 'cape-town',     name: 'Cape Town',     country: 'South Africa', countryCode: 'ZA', lat: -33.9249, lon: 18.4241, region: 'sub-saharan-africa' },

  // Oceania
  { slug: 'sydney',        name: 'Sydney',        country: 'Australia',    countryCode: 'AU', lat: -33.8688, lon: 151.2093, region: 'oceania' },
  { slug: 'melbourne',     name: 'Melbourne',     country: 'Australia',    countryCode: 'AU', lat: -37.8136, lon: 144.9631, region: 'oceania' },
];

export const REGION_LABELS: Record<City['region'], string> = {
  'gcc':                'GCC & Arabian Peninsula',
  'levant':             'Levant & Middle East',
  'north-africa':       'North Africa',
  'south-asia':         'South Asia',
  'southeast-asia':     'Southeast Asia',
  'europe':             'Europe',
  'north-america':      'North America',
  'sub-saharan-africa': 'Sub-Saharan Africa',
  'oceania':            'Oceania',
};

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
