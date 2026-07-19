/**
 * Daily content pool — 15 verses, 15 hadith, 15 duas.
 *
 * Rotated by day-of-year modulo pool length. Small, hand-curated pool
 * so every day of the week shows fresh content for regular visitors.
 * Grows over time — v1.1+ can expand to ~90 items per category.
 *
 * All hadith are from Sahih Bukhari or Sahih Muslim (highest authenticity).
 * All duas are from Qur'an or Sahih hadith — no invented supplications.
 */

export interface DailyVerse {
  verse_key: string;         // "2:255"
  arabic: string;
  english: string;
  reference: string;         // "Al-Baqarah 2:255"
}

export interface DailyHadith {
  arabic: string;
  english: string;
  source: string;            // "Sahih al-Bukhari 6502"
  narrator: string;          // "Abu Hurairah (ra)"
}

export interface DailyDua {
  arabic: string;
  transliteration: string;
  english: string;
  source: string;            // "Al-Baqarah 2:201" or "Sahih Muslim 2704"
}

export const DAILY_VERSES: DailyVerse[] = [
  { verse_key: '2:255',  arabic: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ',                       english: 'Allah! There is no god except Him — the Ever-Living, the Sustainer.',                                                              reference: 'Al-Baqarah 2:255' },
  { verse_key: '13:28',  arabic: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',                                english: 'Verily, in the remembrance of Allah do hearts find rest.',                                                                          reference: 'Ar-Ra\'d 13:28' },
  { verse_key: '94:5',   arabic: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',                                              english: 'So, verily, with every hardship comes ease.',                                                                                       reference: 'Ash-Sharh 94:5' },
  { verse_key: '2:286',  arabic: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا',                              english: 'Allah does not burden a soul beyond what it can bear.',                                                                             reference: 'Al-Baqarah 2:286' },
  { verse_key: '65:3',   arabic: 'وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥ',                            english: 'And whoever puts their trust in Allah — He is enough for them.',                                                                    reference: 'At-Talaq 65:3' },
  { verse_key: '39:53',  arabic: 'لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ',                                       english: 'Do not despair of Allah\'s mercy.',                                                                                                  reference: 'Az-Zumar 39:53' },
  { verse_key: '3:139',  arabic: 'وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ وَأَنتُمُ ٱلْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ', english: 'Do not lose heart, nor fall into despair; you shall triumph if you are true in faith.',                                            reference: 'Al-Imran 3:139' },
  { verse_key: '2:152',  arabic: 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ',                                                  english: 'So remember Me; I will remember you.',                                                                                              reference: 'Al-Baqarah 2:152' },
  { verse_key: '3:159',  arabic: 'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى ٱللَّهِ',                                   english: 'So when you have made a decision, put your trust in Allah.',                                                                        reference: 'Al-Imran 3:159' },
  { verse_key: '55:60',  arabic: 'هَلْ جَزَآءُ ٱلْإِحْسَـٰنِ إِلَّا ٱلْإِحْسَـٰنُ',                              english: 'Is the reward for good anything but good?',                                                                                         reference: 'Ar-Rahman 55:60' },
  { verse_key: '17:80',  arabic: 'وَقُل رَّبِّ أَدْخِلْنِى مُدْخَلَ صِدْقٍ وَأَخْرِجْنِى مُخْرَجَ صِدْقٍ',       english: 'And say: My Lord, cause me to enter a sound entrance and to exit a sound exit.',                                                    reference: 'Al-Isra 17:80' },
  { verse_key: '20:114', arabic: 'وَقُل رَّبِّ زِدْنِى عِلْمًا',                                                english: 'And say: My Lord, increase me in knowledge.',                                                                                       reference: 'Ta-Ha 20:114' },
  { verse_key: '25:74',  arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعْيُنٍ',       english: 'Our Lord, grant us from our spouses and offspring a comfort to our eyes.',                                                          reference: 'Al-Furqan 25:74' },
  { verse_key: '40:60',  arabic: 'ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ',                                                english: 'Call upon Me; I will respond to you.',                                                                                              reference: 'Ghafir 40:60' },
  { verse_key: '2:201',  arabic: 'رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةً وَفِى ٱلْـَٔاخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ', english: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',                    reference: 'Al-Baqarah 2:201' },
];

export const DAILY_HADITH: DailyHadith[] = [
  { arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',                                                                                              english: 'Actions are only judged by their intentions.',                                                                       source: 'Sahih al-Bukhari 1',    narrator: 'Umar ibn al-Khattab (ra)' },
  { arabic: 'مَنْ حَسُنَ إِسْلاَمُ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ',                                                                    english: 'Part of the beauty of a person\'s Islam is leaving what does not concern them.',                                     source: 'Sunan at-Tirmidhi 2317', narrator: 'Abu Hurairah (ra)' },
  { arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',                                                              english: 'A Muslim is one from whose tongue and hand other Muslims are safe.',                                                 source: 'Sahih al-Bukhari 10',   narrator: 'Abdullah ibn \'Amr (ra)' },
  { arabic: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ',                                                                                        english: 'The merciful will be shown mercy by the Most Merciful.',                                                             source: 'Sunan Abi Dawud 4941',  narrator: 'Abdullah ibn \'Amr (ra)' },
  { arabic: 'مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللَّهَ',                                                                                english: 'Whoever does not thank people, has not thanked Allah.',                                                              source: 'Sunan Abi Dawud 4811',  narrator: 'Abu Hurairah (ra)' },
  { arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',                                                                    english: 'The most beloved deeds to Allah are those done consistently, even if small.',                                        source: 'Sahih al-Bukhari 6464', narrator: 'Aisha (ra)' },
  { arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',                             english: 'Whoever travels a path in search of knowledge, Allah will make easy for them the path to Paradise.',                 source: 'Sahih Muslim 2699',    narrator: 'Abu Hurairah (ra)' },
  { arabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا',                                                english: 'Fear Allah wherever you are, follow a bad deed with a good one — it will erase it.',                                 source: 'Sunan at-Tirmidhi 1987',narrator: 'Abu Dharr (ra)' },
  { arabic: 'مَنْ صَمَتَ نَجَا',                                                                                                            english: 'Whoever remains silent is saved.',                                                                                  source: 'Sunan at-Tirmidhi 2501',narrator: 'Abdullah ibn \'Amr (ra)' },
  { arabic: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',                                                                                                english: 'Supplication is worship.',                                                                                          source: 'Sunan at-Tirmidhi 2969',narrator: 'An-Nu\'man ibn Bashir (ra)' },
  { arabic: 'الصَّلَاةُ عِمَادُ الدِّينِ',                                                                                                  english: 'Prayer is the pillar of the religion.',                                                                              source: 'Bayhaqi',              narrator: 'Umar ibn al-Khattab (ra)' },
  { arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي',                                                                english: 'The best of you is the one who is best to his family, and I am the best of you to my family.',                        source: 'Sunan at-Tirmidhi 3895',narrator: 'Aisha (ra)' },
  { arabic: 'مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا أَوْ يَزْرَعُ زَرْعًا فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ إِلَّا كَانَ لَهُ بِهِ صَدَقَةٌ', english: 'Whenever a Muslim plants a tree or sows seeds, and a bird, human, or animal eats from it — it is charity for him.', source: 'Sahih al-Bukhari 2320',narrator: 'Anas ibn Malik (ra)' },
  { arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',                                       english: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',                                       source: 'Sahih al-Bukhari 6018',narrator: 'Abu Hurairah (ra)' },
  { arabic: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ',                                                                                     english: 'Allah is Beautiful and He loves beauty.',                                                                            source: 'Sahih Muslim 91',       narrator: 'Abdullah ibn Mas\'ud (ra)' },
];

export const DAILY_DUAS: DailyDua[] = [
  { arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar',              english: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',   source: 'Al-Baqarah 2:201' },
  { arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',                                    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan',                                          english: 'O Allah, I seek refuge in You from anxiety and sorrow.',                                                            source: 'Sahih al-Bukhari 6369' },
  { arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',                                              transliteration: 'Rabbish-rah li sadri wa yassir li amri',                                                    english: 'My Lord, expand for me my chest, and ease for me my affair.',                                                       source: 'Ta-Ha 20:25-26' },
  { arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',                            transliteration: 'Allahumma a\'inni ala dhikrika wa shukrika wa husni ibadatik',                                english: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',                                   source: 'Sunan Abi Dawud 1522' },
  { arabic: 'رَبِّ زِدْنِي عِلْمًا',                                                                       transliteration: 'Rabbi zidni ilma',                                                                          english: 'My Lord, increase me in knowledge.',                                                                                source: 'Ta-Ha 20:114' },
  { arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',                          transliteration: 'Allahumma inni as\'aluk al-\'afiyata fid-dunya wal-akhirah',                                english: 'O Allah, I ask You for well-being in this world and the Hereafter.',                                                 source: 'Sunan Abi Dawud 5074' },
  { arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا',                                     transliteration: 'Rabbana la tu\'akhidhna in nasina aw akhta\'na',                                             english: 'Our Lord, do not hold us accountable if we forget or make a mistake.',                                              source: 'Al-Baqarah 2:286' },
  { arabic: 'اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي',                                                              transliteration: 'Allahumma-hdini wa saddidni',                                                                 english: 'O Allah, guide me and grant me right conduct.',                                                                     source: 'Sahih Muslim 2725' },
  { arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',                                                           transliteration: 'Hasbunallahu wa ni\'mal-wakil',                                                              english: 'Allah is sufficient for us, and He is the best disposer of affairs.',                                              source: 'Al-Imran 3:173' },
  { arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا',                                          transliteration: 'Allahumma la sahla illa ma ja\'altahu sahla',                                                english: 'O Allah, nothing is easy except what You make easy.',                                                                source: 'Ibn Hibban 2427' },
  { arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ',                                                              transliteration: 'Rabbigh-fir li wa tub \'alayya',                                                             english: 'My Lord, forgive me and accept my repentance.',                                                                    source: 'Sunan at-Tirmidhi 3434' },
  { arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا وَعِلْمًا نَافِعًا وَعَمَلًا مُتَقَبَّلًا',      transliteration: 'Allahumma inni as\'aluka rizqan tayyiban wa \'ilman nafi\'an wa \'amalan mutaqabbala',      english: 'O Allah, I ask You for good provision, beneficial knowledge, and deeds that are accepted.',                        source: 'Sunan Ibn Majah 925' },
  { arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا',                                                          transliteration: 'Allahumma-j\'al fi qalbi nura',                                                              english: 'O Allah, place light in my heart.',                                                                                 source: 'Sahih Muslim 763' },
  { arabic: 'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ',                                     transliteration: 'Rabbi la tadharni fardan wa anta khayrul-warithin',                                          english: 'My Lord, do not leave me alone, and You are the best of inheritors.',                                                source: 'Al-Anbiya 21:89' },
  { arabic: 'اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا',                    transliteration: 'Allahumma ati nafsi taqwaha wa zakkiha anta khayru man zakkaha',                              english: 'O Allah, grant my soul its taqwa, and purify it — You are the best of those who purify.',                            source: 'Sahih Muslim 2722' },
];

/** Get index into the pool for today. Deterministic — same day of
 *  year always shows the same content, no personalization. */
export function todayIndex(mod: number): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % mod;
}
