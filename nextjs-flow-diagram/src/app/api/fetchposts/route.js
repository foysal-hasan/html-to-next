// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

// const TGSTAT_API = 'https://api.tgstat.ru/posts/search';
// const DARKWEB_APIS = {
//   facebook: 'http://172.86.116.124:5002/scrape',
//   xss: 'http://172.86.116.124:5004/search_xss',
//   stealer: 'http://172.86.116.124:5003/search',
// };
// const APIFY_APIS = {
//   instagram:
//     'https://api.apify.com/v2/acts/apify~instagram-search-scraper/run-sync-get-dataset',
//   twitter:
//     'https://api.apify.com/v2/acts/apify~twitter-scraper-lite/run-sync-get-dataset',
//   facebook:
//     'https://api.apify.com/v2/acts/danek~facebook-search-rental/run-sync-get-dataset',
// };

// export async function GET() {
//   try {
//     const fetchTelegramPosts = async () => {
//       try {
//         const response = await axios.get(TGSTAT_API, {
//           params: {
//             token: '5bb277405e76a628a0547cacf7279e37',
//             q: 'coinbase',
//             limit: 50,
//           },
//         });
//         return response.data.items.map((post) => ({
//           id: uuidv4(),
//           source: 'Telegram',
//           content: post.text,
//           date: post.date || new Date().toISOString(),
//           link: post.link || '#',
//         }));
//       } catch (error) {
//         console.error('Telegram API Error:', error);
//         return [];
//       }
//     };

//     const fetchDarkWebPosts = async (type) => {
//       try {
//         const response = await axios.post(DARKWEB_APIS[type], {
//           keyword: type,
//         });
//         return response.data.map((post) => ({
//           id: uuidv4(),
//           source: `DarkWeb-${type}`,
//           content: post.text || post.caption || '',
//           date: post.date || new Date().toISOString(),
//           link: post.link || '#',
//         }));
//       } catch (error) {
//         console.error(`DarkWeb ${type} API Error:`, error);
//         return [];
//       }
//     };

//     const telegramPosts = await fetchTelegramPosts();
//     const darkwebFacebookPosts = await fetchDarkWebPosts('facebook');
//     const darkwebXSSPosts = await fetchDarkWebPosts('xss');
//     const darkwebStealerPosts = await fetchDarkWebPosts('stealer');

//     const allPosts = [
//       ...telegramPosts,
//       ...darkwebFacebookPosts,
//       ...darkwebXSSPosts,
//       ...darkwebStealerPosts,
//     ];

//     return Response.json(allPosts);
//   } catch (error) {
//     return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
//   }
// }

export async function GET() {
  return Response.json({ message: 'GET fetchPosts' });
}
