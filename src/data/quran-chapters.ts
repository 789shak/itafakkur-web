/**
 * Quran chapter metadata — all 114 surahs, bundled statically.
 *
 * Source: standard Quran metadata (Uthmani script names +
 * transliteration + English meaning). Verse counts per the Hafs
 * recitation (the canonical Sunni count = 6,236 total).
 *
 * Revelation location: Meccan (before hijrah) or Medinan (after).
 * Some surahs are debated — we use the majority scholarly opinion.
 *
 * Slugs are the transliteration with hyphens for URLs:
 *   /quran/1        — chapter list uses number
 *   /quran/al-fatihah — pretty URL alternative (redirects to /quran/1)
 */

export interface QuranChapter {
  number: number;
  name_arabic: string;
  name_translit: string;
  name_english: string;
  verses: number;
  revelation: 'Meccan' | 'Medinan';
}

export const QURAN_CHAPTERS: QuranChapter[] = [
  { number:   1, name_arabic: 'الفاتحة',       name_translit: 'Al-Fatihah',       name_english: 'The Opening',                     verses:   7, revelation: 'Meccan'  },
  { number:   2, name_arabic: 'البقرة',        name_translit: 'Al-Baqarah',       name_english: 'The Cow',                         verses: 286, revelation: 'Medinan' },
  { number:   3, name_arabic: 'آل عمران',      name_translit: 'Al-Imran',         name_english: 'The Family of Imran',             verses: 200, revelation: 'Medinan' },
  { number:   4, name_arabic: 'النساء',        name_translit: 'An-Nisa',          name_english: 'The Women',                       verses: 176, revelation: 'Medinan' },
  { number:   5, name_arabic: 'المائدة',       name_translit: 'Al-Maidah',        name_english: 'The Table Spread',                verses: 120, revelation: 'Medinan' },
  { number:   6, name_arabic: 'الأنعام',       name_translit: 'Al-Anam',          name_english: 'The Cattle',                      verses: 165, revelation: 'Meccan'  },
  { number:   7, name_arabic: 'الأعراف',       name_translit: 'Al-Araf',          name_english: 'The Heights',                     verses: 206, revelation: 'Meccan'  },
  { number:   8, name_arabic: 'الأنفال',       name_translit: 'Al-Anfal',         name_english: 'The Spoils of War',               verses:  75, revelation: 'Medinan' },
  { number:   9, name_arabic: 'التوبة',        name_translit: 'At-Tawbah',        name_english: 'The Repentance',                  verses: 129, revelation: 'Medinan' },
  { number:  10, name_arabic: 'يونس',          name_translit: 'Yunus',            name_english: 'Jonah',                           verses: 109, revelation: 'Meccan'  },
  { number:  11, name_arabic: 'هود',           name_translit: 'Hud',              name_english: 'Hud',                             verses: 123, revelation: 'Meccan'  },
  { number:  12, name_arabic: 'يوسف',          name_translit: 'Yusuf',            name_english: 'Joseph',                          verses: 111, revelation: 'Meccan'  },
  { number:  13, name_arabic: 'الرعد',         name_translit: 'Ar-Rad',           name_english: 'The Thunder',                     verses:  43, revelation: 'Medinan' },
  { number:  14, name_arabic: 'إبراهيم',       name_translit: 'Ibrahim',          name_english: 'Abraham',                         verses:  52, revelation: 'Meccan'  },
  { number:  15, name_arabic: 'الحجر',         name_translit: 'Al-Hijr',          name_english: 'The Rocky Tract',                 verses:  99, revelation: 'Meccan'  },
  { number:  16, name_arabic: 'النحل',         name_translit: 'An-Nahl',          name_english: 'The Bee',                         verses: 128, revelation: 'Meccan'  },
  { number:  17, name_arabic: 'الإسراء',       name_translit: 'Al-Isra',          name_english: 'The Night Journey',               verses: 111, revelation: 'Meccan'  },
  { number:  18, name_arabic: 'الكهف',         name_translit: 'Al-Kahf',          name_english: 'The Cave',                        verses: 110, revelation: 'Meccan'  },
  { number:  19, name_arabic: 'مريم',          name_translit: 'Maryam',           name_english: 'Mary',                            verses:  98, revelation: 'Meccan'  },
  { number:  20, name_arabic: 'طه',            name_translit: 'Ta-Ha',            name_english: 'Ta-Ha',                           verses: 135, revelation: 'Meccan'  },
  { number:  21, name_arabic: 'الأنبياء',      name_translit: 'Al-Anbiya',        name_english: 'The Prophets',                    verses: 112, revelation: 'Meccan'  },
  { number:  22, name_arabic: 'الحج',          name_translit: 'Al-Hajj',          name_english: 'The Pilgrimage',                  verses:  78, revelation: 'Medinan' },
  { number:  23, name_arabic: 'المؤمنون',      name_translit: 'Al-Muminun',       name_english: 'The Believers',                   verses: 118, revelation: 'Meccan'  },
  { number:  24, name_arabic: 'النور',         name_translit: 'An-Nur',           name_english: 'The Light',                       verses:  64, revelation: 'Medinan' },
  { number:  25, name_arabic: 'الفرقان',       name_translit: 'Al-Furqan',        name_english: 'The Criterion',                   verses:  77, revelation: 'Meccan'  },
  { number:  26, name_arabic: 'الشعراء',       name_translit: 'Ash-Shuara',       name_english: 'The Poets',                       verses: 227, revelation: 'Meccan'  },
  { number:  27, name_arabic: 'النمل',         name_translit: 'An-Naml',          name_english: 'The Ants',                        verses:  93, revelation: 'Meccan'  },
  { number:  28, name_arabic: 'القصص',         name_translit: 'Al-Qasas',         name_english: 'The Stories',                     verses:  88, revelation: 'Meccan'  },
  { number:  29, name_arabic: 'العنكبوت',      name_translit: 'Al-Ankabut',       name_english: 'The Spider',                      verses:  69, revelation: 'Meccan'  },
  { number:  30, name_arabic: 'الروم',         name_translit: 'Ar-Rum',           name_english: 'The Romans',                      verses:  60, revelation: 'Meccan'  },
  { number:  31, name_arabic: 'لقمان',         name_translit: 'Luqman',           name_english: 'Luqman',                          verses:  34, revelation: 'Meccan'  },
  { number:  32, name_arabic: 'السجدة',        name_translit: 'As-Sajdah',        name_english: 'The Prostration',                 verses:  30, revelation: 'Meccan'  },
  { number:  33, name_arabic: 'الأحزاب',       name_translit: 'Al-Ahzab',         name_english: 'The Combined Forces',             verses:  73, revelation: 'Medinan' },
  { number:  34, name_arabic: 'سبأ',           name_translit: 'Saba',             name_english: 'Sheba',                           verses:  54, revelation: 'Meccan'  },
  { number:  35, name_arabic: 'فاطر',          name_translit: 'Fatir',            name_english: 'The Originator',                  verses:  45, revelation: 'Meccan'  },
  { number:  36, name_arabic: 'يس',            name_translit: 'Ya-Sin',           name_english: 'Ya Sin',                          verses:  83, revelation: 'Meccan'  },
  { number:  37, name_arabic: 'الصافات',       name_translit: 'As-Saffat',        name_english: 'Those Who Set the Ranks',         verses: 182, revelation: 'Meccan'  },
  { number:  38, name_arabic: 'ص',             name_translit: 'Sad',              name_english: 'Sad',                             verses:  88, revelation: 'Meccan'  },
  { number:  39, name_arabic: 'الزمر',         name_translit: 'Az-Zumar',         name_english: 'The Troops',                      verses:  75, revelation: 'Meccan'  },
  { number:  40, name_arabic: 'غافر',          name_translit: 'Ghafir',           name_english: 'The Forgiver',                    verses:  85, revelation: 'Meccan'  },
  { number:  41, name_arabic: 'فصلت',          name_translit: 'Fussilat',         name_english: 'Explained in Detail',             verses:  54, revelation: 'Meccan'  },
  { number:  42, name_arabic: 'الشورى',        name_translit: 'Ash-Shura',        name_english: 'The Consultation',                verses:  53, revelation: 'Meccan'  },
  { number:  43, name_arabic: 'الزخرف',        name_translit: 'Az-Zukhruf',       name_english: 'The Gold Adornments',             verses:  89, revelation: 'Meccan'  },
  { number:  44, name_arabic: 'الدخان',        name_translit: 'Ad-Dukhan',        name_english: 'The Smoke',                       verses:  59, revelation: 'Meccan'  },
  { number:  45, name_arabic: 'الجاثية',       name_translit: 'Al-Jathiyah',      name_english: 'The Crouching',                   verses:  37, revelation: 'Meccan'  },
  { number:  46, name_arabic: 'الأحقاف',       name_translit: 'Al-Ahqaf',         name_english: 'The Wind-Curved Sandhills',       verses:  35, revelation: 'Meccan'  },
  { number:  47, name_arabic: 'محمد',          name_translit: 'Muhammad',         name_english: 'Muhammad',                        verses:  38, revelation: 'Medinan' },
  { number:  48, name_arabic: 'الفتح',         name_translit: 'Al-Fath',          name_english: 'The Victory',                     verses:  29, revelation: 'Medinan' },
  { number:  49, name_arabic: 'الحجرات',       name_translit: 'Al-Hujurat',       name_english: 'The Rooms',                       verses:  18, revelation: 'Medinan' },
  { number:  50, name_arabic: 'ق',             name_translit: 'Qaf',              name_english: 'Qaf',                             verses:  45, revelation: 'Meccan'  },
  { number:  51, name_arabic: 'الذاريات',      name_translit: 'Adh-Dhariyat',     name_english: 'The Winnowing Winds',             verses:  60, revelation: 'Meccan'  },
  { number:  52, name_arabic: 'الطور',         name_translit: 'At-Tur',           name_english: 'The Mount',                       verses:  49, revelation: 'Meccan'  },
  { number:  53, name_arabic: 'النجم',         name_translit: 'An-Najm',          name_english: 'The Star',                        verses:  62, revelation: 'Meccan'  },
  { number:  54, name_arabic: 'القمر',         name_translit: 'Al-Qamar',         name_english: 'The Moon',                        verses:  55, revelation: 'Meccan'  },
  { number:  55, name_arabic: 'الرحمن',        name_translit: 'Ar-Rahman',        name_english: 'The Most Merciful',               verses:  78, revelation: 'Medinan' },
  { number:  56, name_arabic: 'الواقعة',       name_translit: 'Al-Waqiah',        name_english: 'The Inevitable',                  verses:  96, revelation: 'Meccan'  },
  { number:  57, name_arabic: 'الحديد',        name_translit: 'Al-Hadid',         name_english: 'The Iron',                        verses:  29, revelation: 'Medinan' },
  { number:  58, name_arabic: 'المجادلة',      name_translit: 'Al-Mujadilah',     name_english: 'The Pleading Woman',              verses:  22, revelation: 'Medinan' },
  { number:  59, name_arabic: 'الحشر',         name_translit: 'Al-Hashr',         name_english: 'The Exile',                       verses:  24, revelation: 'Medinan' },
  { number:  60, name_arabic: 'الممتحنة',      name_translit: 'Al-Mumtahanah',    name_english: 'She That Is To Be Examined',      verses:  13, revelation: 'Medinan' },
  { number:  61, name_arabic: 'الصف',          name_translit: 'As-Saff',          name_english: 'The Ranks',                       verses:  14, revelation: 'Medinan' },
  { number:  62, name_arabic: 'الجمعة',        name_translit: 'Al-Jumuah',        name_english: 'The Congregation, Friday',        verses:  11, revelation: 'Medinan' },
  { number:  63, name_arabic: 'المنافقون',     name_translit: 'Al-Munafiqun',     name_english: 'The Hypocrites',                  verses:  11, revelation: 'Medinan' },
  { number:  64, name_arabic: 'التغابن',       name_translit: 'At-Taghabun',      name_english: 'The Mutual Disillusion',          verses:  18, revelation: 'Medinan' },
  { number:  65, name_arabic: 'الطلاق',        name_translit: 'At-Talaq',         name_english: 'The Divorce',                     verses:  12, revelation: 'Medinan' },
  { number:  66, name_arabic: 'التحريم',       name_translit: 'At-Tahrim',        name_english: 'The Prohibition',                 verses:  12, revelation: 'Medinan' },
  { number:  67, name_arabic: 'الملك',         name_translit: 'Al-Mulk',          name_english: 'The Sovereignty',                 verses:  30, revelation: 'Meccan'  },
  { number:  68, name_arabic: 'القلم',         name_translit: 'Al-Qalam',         name_english: 'The Pen',                         verses:  52, revelation: 'Meccan'  },
  { number:  69, name_arabic: 'الحاقة',        name_translit: 'Al-Haqqah',        name_english: 'The Reality',                     verses:  52, revelation: 'Meccan'  },
  { number:  70, name_arabic: 'المعارج',       name_translit: 'Al-Maarij',        name_english: 'The Ascending Stairways',         verses:  44, revelation: 'Meccan'  },
  { number:  71, name_arabic: 'نوح',           name_translit: 'Nuh',              name_english: 'Noah',                            verses:  28, revelation: 'Meccan'  },
  { number:  72, name_arabic: 'الجن',          name_translit: 'Al-Jinn',          name_english: 'The Jinn',                        verses:  28, revelation: 'Meccan'  },
  { number:  73, name_arabic: 'المزمل',        name_translit: 'Al-Muzzammil',     name_english: 'The Enshrouded One',              verses:  20, revelation: 'Meccan'  },
  { number:  74, name_arabic: 'المدثر',        name_translit: 'Al-Muddaththir',   name_english: 'The Cloaked One',                 verses:  56, revelation: 'Meccan'  },
  { number:  75, name_arabic: 'القيامة',       name_translit: 'Al-Qiyamah',       name_english: 'The Resurrection',                verses:  40, revelation: 'Meccan'  },
  { number:  76, name_arabic: 'الإنسان',       name_translit: 'Al-Insan',         name_english: 'The Human',                       verses:  31, revelation: 'Medinan' },
  { number:  77, name_arabic: 'المرسلات',      name_translit: 'Al-Mursalat',      name_english: 'The Emissaries',                  verses:  50, revelation: 'Meccan'  },
  { number:  78, name_arabic: 'النبأ',         name_translit: 'An-Naba',          name_english: 'The Tidings',                     verses:  40, revelation: 'Meccan'  },
  { number:  79, name_arabic: 'النازعات',      name_translit: 'An-Naziat',        name_english: 'Those Who Drag Forth',            verses:  46, revelation: 'Meccan'  },
  { number:  80, name_arabic: 'عبس',           name_translit: 'Abasa',            name_english: 'He Frowned',                      verses:  42, revelation: 'Meccan'  },
  { number:  81, name_arabic: 'التكوير',       name_translit: 'At-Takwir',        name_english: 'The Overthrowing',                verses:  29, revelation: 'Meccan'  },
  { number:  82, name_arabic: 'الانفطار',      name_translit: 'Al-Infitar',       name_english: 'The Cleaving',                    verses:  19, revelation: 'Meccan'  },
  { number:  83, name_arabic: 'المطففين',      name_translit: 'Al-Mutaffifin',    name_english: 'The Defrauders',                  verses:  36, revelation: 'Meccan'  },
  { number:  84, name_arabic: 'الانشقاق',      name_translit: 'Al-Inshiqaq',      name_english: 'The Splitting Open',              verses:  25, revelation: 'Meccan'  },
  { number:  85, name_arabic: 'البروج',        name_translit: 'Al-Buruj',         name_english: 'The Mansions of the Stars',       verses:  22, revelation: 'Meccan'  },
  { number:  86, name_arabic: 'الطارق',        name_translit: 'At-Tariq',         name_english: 'The Nightcomer',                  verses:  17, revelation: 'Meccan'  },
  { number:  87, name_arabic: 'الأعلى',        name_translit: 'Al-Ala',           name_english: 'The Most High',                   verses:  19, revelation: 'Meccan'  },
  { number:  88, name_arabic: 'الغاشية',       name_translit: 'Al-Ghashiyah',     name_english: 'The Overwhelming',                verses:  26, revelation: 'Meccan'  },
  { number:  89, name_arabic: 'الفجر',         name_translit: 'Al-Fajr',          name_english: 'The Dawn',                        verses:  30, revelation: 'Meccan'  },
  { number:  90, name_arabic: 'البلد',         name_translit: 'Al-Balad',         name_english: 'The City',                        verses:  20, revelation: 'Meccan'  },
  { number:  91, name_arabic: 'الشمس',         name_translit: 'Ash-Shams',        name_english: 'The Sun',                         verses:  15, revelation: 'Meccan'  },
  { number:  92, name_arabic: 'الليل',         name_translit: 'Al-Layl',          name_english: 'The Night',                       verses:  21, revelation: 'Meccan'  },
  { number:  93, name_arabic: 'الضحى',         name_translit: 'Ad-Duha',          name_english: 'The Morning Hours',               verses:  11, revelation: 'Meccan'  },
  { number:  94, name_arabic: 'الشرح',         name_translit: 'Ash-Sharh',        name_english: 'The Relief',                      verses:   8, revelation: 'Meccan'  },
  { number:  95, name_arabic: 'التين',         name_translit: 'At-Tin',           name_english: 'The Fig',                         verses:   8, revelation: 'Meccan'  },
  { number:  96, name_arabic: 'العلق',         name_translit: 'Al-Alaq',          name_english: 'The Clot',                        verses:  19, revelation: 'Meccan'  },
  { number:  97, name_arabic: 'القدر',         name_translit: 'Al-Qadr',          name_english: 'The Power',                       verses:   5, revelation: 'Meccan'  },
  { number:  98, name_arabic: 'البينة',        name_translit: 'Al-Bayyinah',      name_english: 'The Clear Proof',                 verses:   8, revelation: 'Medinan' },
  { number:  99, name_arabic: 'الزلزلة',       name_translit: 'Az-Zalzalah',      name_english: 'The Earthquake',                  verses:   8, revelation: 'Medinan' },
  { number: 100, name_arabic: 'العاديات',      name_translit: 'Al-Adiyat',        name_english: 'The Chargers',                    verses:  11, revelation: 'Meccan'  },
  { number: 101, name_arabic: 'القارعة',       name_translit: 'Al-Qariah',        name_english: 'The Calamity',                    verses:  11, revelation: 'Meccan'  },
  { number: 102, name_arabic: 'التكاثر',       name_translit: 'At-Takathur',      name_english: 'The Rivalry in World Increase',   verses:   8, revelation: 'Meccan'  },
  { number: 103, name_arabic: 'العصر',         name_translit: 'Al-Asr',           name_english: 'The Declining Day',               verses:   3, revelation: 'Meccan'  },
  { number: 104, name_arabic: 'الهمزة',        name_translit: 'Al-Humazah',       name_english: 'The Slanderer',                   verses:   9, revelation: 'Meccan'  },
  { number: 105, name_arabic: 'الفيل',         name_translit: 'Al-Fil',           name_english: 'The Elephant',                    verses:   5, revelation: 'Meccan'  },
  { number: 106, name_arabic: 'قريش',          name_translit: 'Quraysh',          name_english: 'Quraysh',                         verses:   4, revelation: 'Meccan'  },
  { number: 107, name_arabic: 'الماعون',       name_translit: 'Al-Maun',          name_english: 'The Small Kindnesses',            verses:   7, revelation: 'Meccan'  },
  { number: 108, name_arabic: 'الكوثر',        name_translit: 'Al-Kawthar',       name_english: 'The Abundance',                   verses:   3, revelation: 'Meccan'  },
  { number: 109, name_arabic: 'الكافرون',      name_translit: 'Al-Kafirun',       name_english: 'The Disbelievers',                verses:   6, revelation: 'Meccan'  },
  { number: 110, name_arabic: 'النصر',         name_translit: 'An-Nasr',          name_english: 'The Divine Support',              verses:   3, revelation: 'Medinan' },
  { number: 111, name_arabic: 'المسد',         name_translit: 'Al-Masad',         name_english: 'The Palm Fiber',                  verses:   5, revelation: 'Meccan'  },
  { number: 112, name_arabic: 'الإخلاص',       name_translit: 'Al-Ikhlas',        name_english: 'The Sincerity',                   verses:   4, revelation: 'Meccan'  },
  { number: 113, name_arabic: 'الفلق',         name_translit: 'Al-Falaq',         name_english: 'The Daybreak',                    verses:   5, revelation: 'Meccan'  },
  { number: 114, name_arabic: 'الناس',         name_translit: 'An-Nas',           name_english: 'The Mankind',                     verses:   6, revelation: 'Meccan'  },
];

export function getChapter(number: number): QuranChapter | undefined {
  return QURAN_CHAPTERS.find((c) => c.number === number);
}
