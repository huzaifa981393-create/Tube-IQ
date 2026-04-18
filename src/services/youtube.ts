import axios from 'axios';

const YT_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const ANALYTICS_BASE_URL = 'https://youtubeanalytics.googleapis.com/v2';

export const fetchChannelData = async (token: string) => {
  const res = await axios.get(`${YT_BASE_URL}/channels`, {
    params: {
      part: 'snippet,statistics,brandingSettings,contentDetails',
      mine: true,
    },
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const item = res.data.items[0];
  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high.url,
    subscriberCount: item.statistics.subscriberCount,
    viewCount: item.statistics.viewCount,
    videoCount: item.statistics.videoCount,
    uploadsPlaylistId: item.contentDetails.relatedPlaylists.uploads,
    publishedAt: item.snippet.publishedAt,
  };
};

export const fetchAllVideos = async (token: string, uploadsPlaylistId: string) => {
  let videos: any[] = [];
  let nextPageToken = '';
  
  do {
    const res: any = await axios.get(`${YT_BASE_URL}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        maxResults: 50,
        playlistId: uploadsPlaylistId,
        pageToken: nextPageToken,
      },
      headers: { Authorization: `Bearer ${token}` }
    });
    
    videos = [...videos, ...res.data.items];
    nextPageToken = res.data.nextPageToken || '';
  } while (nextPageToken);
  
  return videos;
};

const chunkArray = (array: any[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const fetchVideoStats = async (token: string, videoIds: string[]) => {
  const chunks = chunkArray(videoIds, 50);
  let allStats: any[] = [];
  
  for (const chunk of chunks) {
    const res = await axios.get(`${YT_BASE_URL}/videos`, {
      params: {
        part: 'statistics,snippet,contentDetails,status',
        id: chunk.join(','),
      },
      headers: { Authorization: `Bearer ${token}` }
    });
    allStats = [...allStats, ...res.data.items];
  }
  
  return allStats.map(v => ({
    id: v.id,
    title: v.snippet.title,
    description: v.snippet.description,
    thumbnail: v.snippet.thumbnails.high.url,
    publishedAt: v.snippet.publishedAt,
    views: v.statistics.viewCount,
    likes: v.statistics.likeCount || '0',
    comments: v.statistics.commentCount || '0',
    duration: v.contentDetails.duration,
    tags: v.snippet.tags,
    privacyStatus: v.status.privacyStatus,
  }));
};

export const fetchAnalytics = async (token: string) => {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const res = await axios.get(`${ANALYTICS_BASE_URL}/reports`, {
    params: {
      ids: 'channel==MINE',
      startDate,
      endDate,
      metrics: 'views,estimatedMinutesWatched,subscribersGained,subscribersLost,likes,comments,shares,estimatedRevenue,impressions,impressionClickThroughRate',
      dimensions: 'day',
      sort: 'day',
    },
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const rows = res.data.rows || [];
  const totals = rows.reduce((acc: any, row: any) => ({
    views: acc.views + Number(row[1]),
    watchTime: acc.watchTime + Number(row[2]),
    subsGained: acc.subsGained + Number(row[3]),
    subsLost: acc.subsLost + Number(row[4]),
    revenue: acc.revenue + Number(row[8]),
    impressions: acc.impressions + Number(row[9]),
    ctr: acc.ctr + Number(row[10]),
  }), { views: 0, watchTime: 0, subsGained: 0, subsLost: 0, revenue: 0, impressions: 0, ctr: 0 });

  return {
    views: totals.views,
    watchTimeHours: Math.round(totals.watchTime / 60),
    subsGained: totals.subsGained,
    subsLost: totals.subsLost,
    revenue: totals.revenue,
    avgCTR: rows.length > 0 ? totals.ctr / rows.length : 0,
    dayByDayViews: rows.map((row: any) => ({
      date: row[0],
      value: Number(row[1]),
    })),
  };
};

export const deleteVideo = async (token: string, videoId: string) => {
  await axios.delete(`${YT_BASE_URL}/videos`, {
    params: { id: videoId },
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const searchChannels = async (token: string, query: string) => {
  const res = await axios.get(`${YT_BASE_URL}/search`, {
    params: {
      part: 'snippet',
      q: query,
      type: 'channel',
      maxResults: 5,
    },
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.items;
};


export const updateVideo = async (token: string, videoId: string, title: string, description: string, tags: string[]) => {
  await axios.put(`${YT_BASE_URL}/videos`, {
    id: videoId,
    snippet: {
      title,
      description,
      tags,
      categoryId: '22', // Default to People & Blogs for generic updates
    }
  }, {
    params: { part: 'snippet' },
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const fetchComments = async (token: string, videoId: string) => {
  const res = await axios.get(`${YT_BASE_URL}/commentThreads`, {
    params: {
      part: 'snippet',
      videoId,
      maxResults: 100,
    },
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.items;
};

export const postReply = async (token: string, parentId: string, text: string) => {
  await axios.post(`${YT_BASE_URL}/comments`, {
    snippet: {
      parentId,
      textOriginal: text
    }
  }, {
    params: { part: 'snippet' },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const uploadVideo = async (token: string, file: File, metadata: any, onProgress: (pct: number) => void) => {
  // Step 1: Init resumable upload
  const initRes = await axios.post(
    'https://www.googleapis.com/upload/youtube/v3/videos',
    metadata,
    {
      params: { 
        uploadType: 'resumable',
        part: 'snippet,status'
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': file.type,
        'X-Upload-Content-Length': file.size.toString()
      }
    }
  );

  const uploadUrl = initRes.headers.location;

  // Step 2: Upload file with progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = reject;
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(file);
  });
};

