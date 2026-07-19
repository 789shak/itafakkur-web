/**
 * Asma-ul-Husna — the 99 Names of Allah.
 *
 * Standard list transmitted through hadith. Number, Arabic, transliteration,
 * primary English translation, and a short meaning line. Descriptions are
 * kept concise (one-two sentences); expanded scholarly explanations are
 * a v1.1+ enhancement.
 *
 * Each entry generates its own SEO page at /99-names/[slug], for a total
 * of 99 indexable pages targeting queries like "Ar-Rahman meaning", "Al-
 * Malik meaning", "99 names of Allah", etc.
 */

export interface DivineName {
  number: number;
  arabic: string;
  transliteration: string;
  translation: string;
  meaning: string;
  slug: string;
}

const n = (number: number, arabic: string, transliteration: string, translation: string, meaning: string): DivineName => ({
  number, arabic, transliteration, translation, meaning,
  slug: transliteration.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
});

export const ASMA_UL_HUSNA: DivineName[] = [
  n(  1, 'الرَّحْمَٰنُ',   'Ar-Rahman',     'The Most Compassionate',    "The One whose mercy encompasses all of creation, believer and disbeliever alike."),
  n(  2, 'الرَّحِيمُ',     'Ar-Raheem',     'The Most Merciful',         "The One whose mercy is reserved for the believers in the Hereafter."),
  n(  3, 'الْمَلِكُ',      'Al-Malik',      'The King',                  "The absolute Sovereign of all creation, with authority over everything."),
  n(  4, 'الْقُدُّوسُ',    'Al-Quddus',     'The Most Holy',             "Free from every defect, worthy of all glorification."),
  n(  5, 'السَّلاَمُ',      'As-Salam',      'The Source of Peace',       "The One from whom all peace and safety originate."),
  n(  6, 'الْمُؤْمِنُ',    'Al-Mumin',      'The Bestower of Faith',     "The One who grants security to His creation and confirms His messengers."),
  n(  7, 'الْمُهَيْمِنُ',   'Al-Muhaymin',   'The Guardian',              "The Overseer and Protector who guards all things."),
  n(  8, 'الْعَزِيزُ',     'Al-Aziz',       'The Almighty',              "The One whose might cannot be resisted or overcome."),
  n(  9, 'الْجَبَّارُ',    'Al-Jabbar',     'The Compeller',             "The One who mends what is broken and completes what is deficient."),
  n( 10, 'الْمُتَكَبِّرُ',  'Al-Mutakabbir', 'The Supreme',               "The One whose greatness is beyond every created thing."),
  n( 11, 'الْخَالِقُ',     'Al-Khaliq',     'The Creator',               "The One who brings everything into being from nothing."),
  n( 12, 'الْبَارِئُ',     'Al-Bari',       'The Originator',            "The One who fashions creation without defect or model."),
  n( 13, 'الْمُصَوِّرُ',   'Al-Musawwir',   'The Fashioner',             "The One who shapes and forms each created thing distinctly."),
  n( 14, 'الْغَفَّارُ',    'Al-Ghaffar',    'The Ever-Forgiving',        "The One who repeatedly and abundantly forgives His servants."),
  n( 15, 'الْقَهَّارُ',    'Al-Qahhar',     'The Subduer',               "The One who prevails over all things by His will."),
  n( 16, 'الْوَهَّابُ',    'Al-Wahhab',     'The Giver of Gifts',        "The One who bestows abundantly without expecting anything in return."),
  n( 17, 'الرَّزَّاقُ',    'Ar-Razzaq',     'The Provider',              "The One who provides for every creature — nothing is denied its share."),
  n( 18, 'الْفَتَّاحُ',    'Al-Fattah',     'The Opener',                "The One who opens what is closed — hearts, minds, and paths to relief."),
  n( 19, 'اَلْعَلِيْمُ',    'Al-Alim',       'The All-Knowing',           "The One whose knowledge encompasses everything, seen and unseen."),
  n( 20, 'الْقَابِضُ',     'Al-Qabid',      'The Withholder',            "The One who withholds and constrains as His wisdom decrees."),
  n( 21, 'الْبَاسِطُ',     'Al-Basit',      'The Expander',              "The One who extends provision and mercy widely."),
  n( 22, 'الْخَافِضُ',     'Al-Khafid',     'The Abaser',                "The One who lowers the arrogant to their proper place."),
  n( 23, 'الرَّافِعُ',     'Ar-Rafi',       'The Exalter',               "The One who raises the humble and elevates the righteous."),
  n( 24, 'الْمُعِزُّ',      'Al-Muizz',      'The Bestower of Honor',     "The One who grants dignity and honor to whom He wills."),
  n( 25, 'الْمُذِلُّ',      'Al-Mudhill',    'The Humiliator',            "The One who humbles those who deserve it."),
  n( 26, 'السَّمِيعُ',     'As-Sami',       'The All-Hearing',           "The One who hears every sound, no matter how subtle."),
  n( 27, 'الْبَصِيرُ',    'Al-Basir',      'The All-Seeing',            "The One whose sight encompasses everything perfectly."),
  n( 28, 'الْحَكَمُ',      'Al-Hakam',      'The Judge',                 "The One who judges between His creation with perfect fairness."),
  n( 29, 'الْعَدْلُ',      'Al-Adl',        'The Utterly Just',          "The One whose every decision and act is perfectly just."),
  n( 30, 'اللَّطِيفُ',    'Al-Latif',      'The Subtle One',            "The One who is gentle with His servants in ways they cannot perceive."),
  n( 31, 'الْخَبِيرُ',     'Al-Khabir',     'The All-Aware',             "The One aware of all matters, both apparent and hidden."),
  n( 32, 'الْحَلِيمُ',     'Al-Halim',      'The Forbearing',            "The One who does not hasten punishment despite His creation's transgressions."),
  n( 33, 'الْعَظِيمُ',    'Al-Azim',       'The Magnificent',           "The One whose greatness is above all imagination."),
  n( 34, 'الْغَفُورُ',     'Al-Ghafur',     'The All-Forgiving',         "The One who forgives sins and covers faults."),
  n( 35, 'الشَّكُورُ',    'Ash-Shakur',    'The Most Appreciative',     "The One who rewards a little obedience with abundant grace."),
  n( 36, 'الْعَلِيُّ',      'Al-Ali',        'The Most High',             "The One who is exalted above every created thing."),
  n( 37, 'الْكَبِيرُ',     'Al-Kabir',      'The Most Great',            "The One whose greatness exceeds all limits."),
  n( 38, 'الْحَفِيظُ',    'Al-Hafiz',      'The Preserver',             "The One who preserves and protects His creation."),
  n( 39, 'المُقيِت',      'Al-Muqit',      'The Nourisher',             "The One who sustains every living being with what it needs."),
  n( 40, 'الْحسِيبُ',      'Al-Hasib',      'The Reckoner',              "The One who is sufficient and takes account of every deed."),
  n( 41, 'الْجَلِيلُ',     'Al-Jalil',      'The Majestic',              "The One whose majesty is beyond description."),
  n( 42, 'الْكَرِيمُ',    'Al-Karim',      'The Most Generous',         "The One whose generosity flows without limit or condition."),
  n( 43, 'الرَّقِيبُ',    'Ar-Raqib',      'The Ever-Watchful',         "The One who is always watching over His creation."),
  n( 44, 'الْمُجِيبُ',   'Al-Mujib',      'The Responder to Prayer',   "The One who answers the supplication of everyone who calls upon Him."),
  n( 45, 'الْوَاسِعُ',    'Al-Wasi',       'The All-Encompassing',      "The One whose mercy, knowledge, and provision include all things."),
  n( 46, 'الْحَكِيمُ',    'Al-Hakim',      'The Most Wise',             "The One whose every action carries perfect wisdom."),
  n( 47, 'الْوَدُودُ',     'Al-Wadud',      'The Most Loving',           "The One who loves His righteous servants and is beloved by them."),
  n( 48, 'الْمَجِيدُ',    'Al-Majid',      'The Most Glorious',         "The One whose glory is complete and eternal."),
  n( 49, 'الْبَاعِثُ',     'Al-Baith',      'The Resurrector',           "The One who will raise the dead on the Day of Judgement."),
  n( 50, 'الشَّهِيدُ',    'Ash-Shahid',    'The Witness',               "The One who witnesses every event, spoken or hidden."),
  n( 51, 'الْحَقُّ',       'Al-Haqq',       'The Truth',                 "The One whose being, words, and actions are absolute truth."),
  n( 52, 'الْوَكِيلُ',    'Al-Wakil',      'The Trustee',               "The One in whom all trust may be placed without disappointment."),
  n( 53, 'الْقَوِيُّ',     'Al-Qawi',       'The Most Strong',           "The One whose strength has no equal."),
  n( 54, 'الْمَتِينُ',    'Al-Matin',      'The Firm One',              "The One whose power is unshakable and eternal."),
  n( 55, 'الْوَلِيُّ',     'Al-Wali',       'The Protecting Friend',     "The Ally and Guardian of the believers."),
  n( 56, 'الْحَمِيدُ',    'Al-Hamid',      'The Most Praiseworthy',     "The One deserving of all praise in every state."),
  n( 57, 'الْمُحْصِي',    'Al-Muhsi',      'The Reckoner of All',       "The One who counts and records every thing, no matter how small."),
  n( 58, 'الْمُبْدِئُ',    'Al-Mubdi',      'The Originator',            "The One who begins all creation from nothing."),
  n( 59, 'الْمُعِيدُ',     'Al-Muid',       'The Restorer',              "The One who will bring back creation on the Day of Resurrection."),
  n( 60, 'الْمُحْيِي',     'Al-Muhyi',      'The Giver of Life',         "The One who breathes life into what was without it."),
  n( 61, 'اَلْمُمِيتُ',    'Al-Mumit',      'The Bringer of Death',      "The One who decrees the death of every living being."),
  n( 62, 'الْحَيُّ',       'Al-Hayy',       'The Ever-Living',           "The One who is perfectly alive and never dies."),
  n( 63, 'الْقَيُّومُ',   'Al-Qayyum',     'The Sustainer',             "The Self-Subsisting One upon whom all existence depends."),
  n( 64, 'الْوَاجِدُ',     'Al-Wajid',      'The Finder',                "The One who finds whatever He seeks — nothing escapes Him."),
  n( 65, 'الْمَاجِدُ',    'Al-Majid',      'The Illustrious',           "The One of highest nobility and grandeur."),
  n( 66, 'الْواحِدُ',     'Al-Wahid',      'The One',                   "The One without partner or equal."),
  n( 67, 'اَلاَحَدُ',      'Al-Ahad',       'The Unique',                "Absolutely singular — one in essence, without any division."),
  n( 68, 'الصَّمَدُ',      'As-Samad',      'The Eternal Refuge',        "The One upon whom all creation depends, yet who depends on none."),
  n( 69, 'الْقَادِرُ',   'Al-Qadir',      'The Most Capable',          "The One who has power over all things."),
  n( 70, 'الْمُقْتَدِرُ',   'Al-Muqtadir',   'The Omnipotent',            "The One whose power is complete and cannot be resisted."),
  n( 71, 'الْمُقَدِّمُ',   'Al-Muqaddim',   'The Expediter',             "The One who advances whatever He wills in time or rank."),
  n( 72, 'الْمُؤَخِّرُ',    'Al-Muakhkhir',  'The Delayer',               "The One who delays whatever He wills according to His wisdom."),
  n( 73, 'الأوَّلُ',       'Al-Awwal',      'The First',                 "The One before whom there was nothing."),
  n( 74, 'الآخِرُ',        'Al-Akhir',      'The Last',                  "The One after whom there will be nothing."),
  n( 75, 'الظَّاهِرُ',    'Az-Zahir',      'The Manifest',              "The One whose existence is evident through His signs."),
  n( 76, 'الْبَاطِنُ',    'Al-Batin',      'The Hidden',                "The One whose essence is beyond the reach of created senses."),
  n( 77, 'الْوَالِي',     'Al-Wali',       'The Governor',              "The One who governs and manages all affairs of the universe."),
  n( 78, 'الْمُتَعَالِي',  'Al-Mutaali',    'The Most Exalted',          "The One infinitely above every attribute of creation."),
  n( 79, 'الْبَرُّ',       'Al-Barr',       'The Source of Goodness',    "The One who is kind and does good abundantly."),
  n( 80, 'التَّوَابُ',    'At-Tawwab',     'The Acceptor of Repentance',"The One who repeatedly turns to His servants in mercy."),
  n( 81, 'الْمُنْتَقِمُ',  'Al-Muntaqim',   'The Avenger',               "The One who takes just vengeance against oppressors."),
  n( 82, 'العَفُوُّ',      'Al-Afuww',      'The Pardoner',              "The One who erases sins as though they never happened."),
  n( 83, 'الرَّؤُوفُ',    'Ar-Rauf',       'The Most Kind',             "The One whose compassion is exceedingly tender."),
  n( 84, 'مَالِكُ الْمُلْكِ',   'Malik-ul-Mulk',    'Owner of All Sovereignty', "The One who owns all dominion — He grants and revokes as He wills."),
  n( 85, 'ذُوالْجَلاَلِ وَالإكْرَامِ', 'Dhu-al-Jalali wal-Ikram', 'Lord of Majesty and Bounty', "The One of infinite majesty and honor."),
  n( 86, 'الْمُقْسِطُ',    'Al-Muqsit',     'The Equitable',             "The One who is perfectly just in all matters."),
  n( 87, 'الْجَامِعُ',    'Al-Jami',       'The Gatherer',              "The One who will gather all creation on the Day of Judgement."),
  n( 88, 'الْغَنِيُّ',    'Al-Ghani',      'The Self-Sufficient',       "The One who has no need of anything or anyone."),
  n( 89, 'الْمُغْنِي',     'Al-Mughni',     'The Enricher',              "The One who enriches whomever He wills."),
  n( 90, 'اَلْمَانِعُ',    'Al-Mani',       'The Withholder',            "The One who prevents harm from reaching His creation."),
  n( 91, 'الضَّارَّ',      'Ad-Darr',       'The Distresser',            "The One who allows hardship to touch His creation for a wise purpose."),
  n( 92, 'النَّافِعُ',    'An-Nafi',       'The Bringer of Benefit',    "The source of every benefit that reaches creation."),
  n( 93, 'النُّورُ',       'An-Nur',        'The Light',                 "The Light of the heavens and the earth — the source of all illumination."),
  n( 94, 'الْهَادِي',     'Al-Hadi',       'The Guide',                 "The One who guides His servants to the truth."),
  n( 95, 'الْبَدِيعُ',    'Al-Badi',       'The Wondrous Originator',   "The One who creates without precedent or model."),
  n( 96, 'اَلْبَاقِي',     'Al-Baqi',       'The Everlasting',           "The One who remains after everything else has passed away."),
  n( 97, 'الْوَارِثُ',    'Al-Warith',     'The Ultimate Inheritor',    "The One to whom all creation eventually returns."),
  n( 98, 'الرَّشِيدُ',    'Ar-Rashid',     'The Guide to the Right Path', "The One who guides to right conduct and prudent action."),
  n( 99, 'الصَّبُورُ',    'As-Sabur',      'The Patient One',           "The One whose patience is limitless — He does not hasten to punish."),
];

export function getDivineName(slug: string): DivineName | undefined {
  return ASMA_UL_HUSNA.find((n) => n.slug === slug);
}
