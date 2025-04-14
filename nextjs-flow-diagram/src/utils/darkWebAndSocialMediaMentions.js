// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export const batchClassifyPosts = async (posts) => {
  const prompt = `
    You are a security and fraud analyst. For each of the following social media posts, perform a sentiment analysis
    and check for any active threats. Based on your analysis, classify the post as either 'low', 'medium', or 'high' risk.

    For each post, output an object with two keys: 'id' (the post identifier) and 'risk' (the risk classification).
    Respond with a JSON array containing one object per post.

    Posts:
    ${posts
      .map((post) => `ID: ${post.id}\nContent: ${post.content}`)
      .join('\n\n')}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
};

// export const normalizePost = (post, source) => {
//   return {
//     id: post.id || `${source}-${Date.now()}`,
//     source,
//     content: post.text || post.snippet || post.caption || post.body || '',
//     date: post.date || post.timestamp || new Date().toISOString(),
//   };
// };

import axios from 'axios';
// import { v4 as uuidv4 } from "uuid";

const TGSTAT_API = 'https://api.tgstat.ru/posts/search';
const DARKWEB_APIS = {
  facebook: 'http://172.86.116.124:5002/scrape',
  xss: 'http://172.86.116.124:5004/search_xss',
  stealer: 'http://172.86.116.124:5003/search',
};
const APIFY_APIS = {
  instagram:
    'https://api.apify.com/v2/acts/apify~instagram-search-scraper/run-sync-get-dataset',
  twitter:
    'https://api.apify.com/v2/acts/apify~twitter-scraper-lite/run-sync-get-dataset',
  facebook:
    'https://api.apify.com/v2/acts/danek~facebook-search-rental/run-sync-get-dataset',
};
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// Normalize API responses
const normalizePost = (post, source) => ({
  id: post.id || `${source}-${Date.now()}`,
  source,
  content: post.text || post.caption || post.message || '',
  date: post.date || post.timestamp || new Date().toISOString(),
  link: post.link || post.url || '#',
});

// Fetch Telegram data
const fetchTelegramPosts = async () => {
  try {
    const response = await axios.get(TGSTAT_API, {
      params: {
        token: 'YOUR_TGSTAT_API_TOKEN',
        q: 'coinbase',
        limit: 50,
        offset: 100,
      },
    });
    return response.data.items.map((post) => normalizePost(post, 'Telegram'));
  } catch (error) {
    console.error('Telegram API Error:', error);
    return [];
  }
};

// Fetch Dark Web data
const fetchDarkWebPosts = async (type) => {
  try {
    const response = await axios.post(DARKWEB_APIS[type], {
      keyword: type,
    });
    return response.data.map((post) => normalizePost(post, `DarkWeb-${type}`));
  } catch (error) {
    console.error(`DarkWeb ${type} API Error:`, error);
    return [];
  }
};

// Fetch Apify data
const fetchApifyPosts = async (type, query) => {
  try {
    const response = await axios.get(APIFY_APIS[type], {
      params: { query },
    });
    return response.data.map((post) => normalizePost(post, type));
  } catch (error) {
    console.error(`Apify ${type} API Error:`, error);
    return [];
  }
};

// Fetch all posts
export default async function handler(req, res) {
  const telegramPosts = await fetchTelegramPosts();
  const darkwebFacebookPosts = await fetchDarkWebPosts('facebook');
  const darkwebXSSPosts = await fetchDarkWebPosts('xss');
  const darkwebStealerPosts = await fetchDarkWebPosts('stealer');
  const instagramPosts = await fetchApifyPosts('instagram', 'restaurant');
  const twitterPosts = await fetchApifyPosts('twitter', 'apify');
  const facebookPosts = await fetchApifyPosts('facebook', 'Mausritter');

  const allPosts = [
    ...telegramPosts,
    ...darkwebFacebookPosts,
    ...darkwebXSSPosts,
    ...darkwebStealerPosts,
    ...instagramPosts,
    ...twitterPosts,
    ...facebookPosts,
  ];

  res.json(allPosts);
}
