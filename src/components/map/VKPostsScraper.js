// 'use client';
// import { classifyLocations } from '@/lib/api/classifyLocation';
// import { setVkMentions } from '@/lib/features/posts/mapPagePostsSlices';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import normalizePosts from '@/utils/normalizePosts';
// import { useCallback, useEffect, useState } from 'react';
// import checkSearchQuery from '@/utils/checkSearchQuery';

// const VKPostsScraper = ({ keywords, search }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);

//   const vkPosts = useAppSelector((state) => state.posts.vkMentions);

//   const dispatch = useAppDispatch();

//   const fetchPosts = useCallback(async () => {
//     try {
//       setLoading(true);
//       let initialResponse = await fetch('/api/fetchApifyPosts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           input: {
//             keywords: keywords,
//           },
//           url: 'easyapi/vk-posts-scraper',
//         }),
//       });

//       let initialPosts = await initialResponse.json();
//       // console.log('initialPosts', initialPosts);
      
//       if (!initialPosts) {
//         setLoading(false);
//         return;
//       }

//       const normalizedPosts = normalizePosts(initialPosts, 'vk');

//       // Process posts in batches of 10 for location classification
//       for (let i = 0; i < normalizedPosts.length; i += 10) {
//         const classifiedPosts = await classifyLocations(
//           normalizedPosts.slice(i, i + 10)
//         );
//         dispatch(setVkMentions(classifiedPosts));
//       }

//     } catch (error) {
//       console.error('VK Posts API Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [keywords, dispatch]);

//   useEffect(() => {
//     if (checkSearchQuery(searchQuery, search)) {
//       setPosts(vkPosts);
//     } else {
//       fetchPosts();
//     }
//   }, [search, searchQuery, vkPosts, fetchPosts]);

//   if (!posts || posts.length === 0) {
//     return null;
//   }

//   return null;
// };

// export default VKPostsScraper;


'use client';

import { classifyLocations } from '@/lib/api/classifyLocation';
import { setVkMentions } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { enhancePostsWithLocation } from '@/lib/locationUtils'; // ✅ Make sure this exists
import { useCallback, useEffect, useState } from 'react';
import checkSearchQuery from '@/utils/checkSearchQuery';

const VKPostsScraper = ({ keywords, search }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
  const vkPosts = useAppSelector((state) => state.posts.vkMentions);

  const [loading, setLoading] = useState(false);

  const shouldFetch = !checkSearchQuery(searchQuery, search);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('📡 Fetching VK posts...');

      const res = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { keywords },
          url: 'easyapi/vk-posts-scraper',
        }),
      });

      const rawPosts = await res.json();
      if (!rawPosts || rawPosts.length === 0) return;

      const normalizedPosts = normalizePosts(rawPosts, 'vk');
      const allEnriched = [];

      // Batch classify and enhance with detected locations
      for (let i = 0; i < normalizedPosts.length; i += 10) {
        const batch = await classifyLocations(normalizedPosts.slice(i, i + 10));
        const enriched = await enhancePostsWithLocation(batch); // ✅ adds lat/lon from content
        const filtered = allEnriched.filter((post) => post.location && post.location !== 'Unknown');
        dispatch(setVkMentions(filtered));
        allEnriched.push(...enriched);
      }

      // const filtered = allEnriched.filter((post) => post.location && post.location !== 'Unknown');
      // console.log('Filtered VK posts:', filtered);

      // dispatch(setVkMentions(filtered));
    } catch (error) {
      console.error('❌ VK Posts API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keywords, dispatch]);

  useEffect(() => {
    if (shouldFetch) {
      fetchPosts();
    }
  }, [shouldFetch, fetchPosts]);

  if (loading) return null;
  return null;
};

export default VKPostsScraper;
