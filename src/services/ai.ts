import axios from 'axios';

export const buildChannelContext = (channel: any, videos: any[], analytics: any) => {
  return `
You are Tube IQ Assistant — an expert YouTube growth advisor 
with complete knowledge of this specific channel.

CHANNEL PROFILE:
- Name: ${channel.title}
- Description: ${channel.description}
- Subscribers: ${channel.subscriberCount}
- Total Views: ${channel.viewCount}
- Total Videos: ${channel.videoCount}
- Channel Created: ${channel.publishedAt}

RECENT ANALYTICS (Last 28 Days):
- Views: ${analytics.views}
- Watch Time: ${analytics.watchTimeHours} hours
- Subscribers Gained: ${analytics.subsGained}
- Subscribers Lost: ${analytics.subsLost}
- Average CTR: ${analytics.avgCTR.toFixed(1)}%
- Estimated Revenue: $${analytics.revenue.toFixed(2)}

TOP 5 PERFORMING VIDEOS:
${videos.slice(0, 5).map((v, i) => 
  `${i + 1}. "${v.title}" — ${v.views} views, ${v.likes} likes, ${v.comments} comments, posted ${v.publishedAt.split('T')[0]}`
).join('\n')}

RECENT 10 VIDEOS:
${videos.slice(0, 10).map(v => 
  `- "${v.title}" (${v.views} views, ${v.publishedAt.split('T')[0]})`
).join('\n')}

CHANNEL NICHE: You should analyze the niche from video titles and descriptions above.

Your goals:
1. Answer questions about this channel's performance.
2. Give specific improvement advice based on real data.
3. Compare stats to YouTube averages.
4. Suggest content ideas based on what performs well.
5. Help optimize titles, descriptions, and tags.
6. Explain why certain videos performed better.
7. Provide growth strategies specific to the niche.

Always be specific, referencing actual numbers from the data.
Respond in the language the user writes in (Hindi/English/Hinglish).
  `;
};

const buildOfflineAnswer = (userMessage: string) => {
  const lower = userMessage.toLowerCase();
  if (lower.includes('title') || lower.includes('best title')) {
    return 'Best title formula: [Emotion] + [Topic] + [Unexpected Payoff]. Example: “India’s Craziest Train Ramp Challenge Gone Wrong!” Title 55 characters ke andar rakho aur first 3 words me curiosity add karo.';
  }
  if (lower.includes('thumbnail')) {
    return 'Thumbnail improve karne ke liye 3 cheezein karo: text 2-3 words, red/yellow high contrast, aur face/action subject ko white outline do. Mobile pe readable hona sabse important hai.';
  }
  if (lower.includes('upload') || lower.includes('aaj')) {
    return 'Aaj ke liye strong idea: “99% log ye AI/tech fact nahi jante” ya niche-specific challenge short. Hindi audience ke liye 7:30 PM - 10 PM IST test karo.';
  }
  return 'Viral growth checklist: first 2 seconds me result tease karo, cuts 1.5 seconds ke andar rakho, title me emotional keyword add karo, thumbnail text bada rakho, aur 6-10 mixed tags use karo. Phir 48 hours analytics se next idea choose karo.';
};

export const askChatbot = async (userMessage: string, history: any[], systemContext: string) => {
  try {
    const response = await axios.post('/api/chat', {
      system: systemContext,
      messages: [
        ...history,
        { role: 'user', content: userMessage }
      ]
    });
    
    return response.data.content.text;
  } catch (error) {
    console.error('Chatbot error:', error);
    return buildOfflineAnswer(userMessage);
  }
};
