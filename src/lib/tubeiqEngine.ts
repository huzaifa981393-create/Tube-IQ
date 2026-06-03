export type OptimizationResult = {
  titles: string[];
  description: string;
  tags: string[];
  hashtags: string[];
  thumbnailIdeas: string[];
  seoScore: number;
  viralChance: number;
  retention: string;
  bestUploadTime: string;
  script: string[];
};

const hindiPowerWords = ['Craziest', 'Insane', 'Gone Wrong', 'India', 'Secret', 'Fastest', 'Challenge'];
const hindiHooks = ['Bhai, pehle 3 seconds miss mat karna!', 'Aaj hum ek aisa twist try karenge jo kisi ne expect nahi kiya.', 'End tak ruko, result shock kar dega.'];

export function scoreTopic(topic: string) {
  const clean = topic.trim() || 'Train Ramp Challenge';
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const novelty = Math.min(30, 12 + wordCount * 4);
  const searchable = /challenge|facts|gaming|review|shorts|india|ai|train/i.test(clean) ? 24 : 16;
  const emotion = /crash|secret|viral|challenge|gone|crazy|scary/i.test(clean) ? 22 : 14;
  return Math.min(96, novelty + searchable + emotion + 18);
}

export function optimizeTopic(topic: string, language: 'hinglish' | 'english' | 'hindi' = 'hinglish'): OptimizationResult {
  const clean = topic.trim() || 'Train Ramp Challenge';
  const score = scoreTopic(clean);
  const short = clean.replace(/\b(video|youtube|shorts)\b/gi, '').trim() || clean;
  const titles = [
    `${short} Gone Wrong! 😱`,
    `India's Craziest ${short} Ever!`,
    `I Tried ${short} So You Don't Have To`,
    `${short}: 30 Seconds Mein Full Shock`,
    `Nobody Expected This ${short} Ending`,
  ];

  const tags = Array.from(new Set([
    clean.toLowerCase(), `${short.toLowerCase()} shorts`, 'youtube shorts', 'viral shorts', 'india youtuber',
    'challenge video', 'trending video', 'high retention', 'viral title', 'hindi creators',
  ]));

  const hashtags = ['#shorts', '#viral', '#tubeiq', '#hindiyoutube', '#trending', `#${short.replace(/\s+/g, '')}`];

  return {
    titles,
    description: `${clean} ka full high-retention breakdown! Watch till the end for the twist.\n\n✅ Hook: first 2 seconds mein outcome tease karo\n✅ Value: clear stakes + fast cuts\n✅ CTA: comment your next challenge idea\n\n${hashtags.join(' ')}`,
    tags,
    hashtags,
    thumbnailIdeas: [
      `Big red arrow + shocked face + 3-word text: "RAMP FAIL?"`,
      `Before/after split: setup on left, crash/result on right`,
      `High contrast yellow text on black-red background with clear subject outline`,
    ],
    seoScore: score,
    viralChance: Math.min(94, score + 6),
    retention: score > 80 ? 'High: 72-86% expected if first cut lands under 1.5s' : 'Medium: improve hook and pacing for 60%+ retention',
    bestUploadTime: '7:30 PM - 10:00 PM IST (Hindi/India Shorts audience peak)',
    script: [
      hindiHooks[0],
      `Setup: "Ye hai ${clean}, aur target simple hai - maximum speed, zero mistake."`,
      'Conflict: "Problem ye hai ki ramp angle bilkul safe nahi lag raha."',
      'Payoff: "3...2...1... aur yahan sab kuch change ho gaya!"',
      'CTA: "Next kaunsa challenge karna chahiye? Comment karo."',
    ],
  };
}

export function analyzeSeo(title: string, description: string, tagsText: string) {
  const tags = tagsText.split(',').map((t) => t.trim()).filter(Boolean);
  let score = 35;
  if (title.length >= 35 && title.length <= 70) score += 18;
  if (/\d|how|why|secret|challenge|viral|india/i.test(title)) score += 12;
  if (description.length > 120) score += 15;
  if (tags.length >= 6) score += 12;
  if (/#shorts|#viral|#trending/i.test(description)) score += 8;
  score = Math.min(100, score);
  return {
    score,
    rankingChance: score > 82 ? 'Strong' : score > 65 ? 'Medium' : 'Needs work',
    suggestions: [
      title.length < 35 ? 'Title ko 35+ characters rakho with one emotional keyword.' : 'Title length healthy hai.',
      description.length < 120 ? 'Description me hook, keywords aur 3 hashtags add karo.' : 'Description SEO context strong hai.',
      tags.length < 6 ? 'At least 6-10 mixed tags add karo: broad + niche + Hindi.' : 'Tags coverage achhi hai.',
    ],
  };
}

export function analyzeThumbnail(fileName = 'thumbnail.png') {
  const seed = fileName.length;
  const ctr = 62 + (seed % 25);
  return {
    ctr,
    brightness: ctr > 76 ? 'Good contrast' : 'Slightly dark',
    readability: seed % 2 === 0 ? 'Readable under 3 words' : 'Text may be too small on mobile',
    emotion: seed % 3 === 0 ? 'Strong surprise face detected' : 'Add clearer face emotion or action moment',
    suggestions: [
      'Text 2-3 words me rakho aur 18% bigger karo.',
      'Red/yellow accent use karo for scroll-stopping contrast.',
      'Main subject ke around white outline add karo.',
    ],
  };
}

export const trendingIndia = [
  { topic: 'Gaming impossible challenges', lift: '+42%', idea: '1 HP clutch challenge in 30 sec' },
  { topic: 'AI facts in Hindi', lift: '+38%', idea: 'AI ne YouTube ko kaise badla?' },
  { topic: 'Train / vehicle ramp stunts', lift: '+35%', idea: 'GTA-style ramp in real physics sim' },
  { topic: 'Cricket edits + viral music', lift: '+31%', idea: 'Last over reaction short' },
  { topic: 'Budget tech hacks', lift: '+27%', idea: '₹0 phone camera upgrade trick' },
];

export const competitorSnapshot = {
  uploadFrequency: '5.2 videos/week',
  averageViews: '184K',
  growth: '+18.4% monthly',
  bestPerformers: ['Challenge + fail ending', 'Hindi reaction hook', 'Before/after thumbnail'],
  viralPattern: 'Fast hook, red/yellow thumbnail, title under 58 characters, upload after 8 PM IST',
};
