// 'use client';
// import { classifyLocations } from '@/lib/api/classifyLocation';
// import { setTwitterMentions } from '@/lib/features/posts/mapPagePostsSlices';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import normalizePosts from '@/utils/normalizePosts';
// import { useCallback, useEffect, useState } from 'react';
// import checkSearchQuery from '@/utils/checkSearchQuery';

// const TwitterMentions = ({ keywords, search }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useAppDispatch();

//   const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
//   const twitterMentions = useAppSelector((state) => state.posts.twitterMentions);

//   const shouldFetch = !checkSearchQuery(searchQuery, search); // Run only if mismatch

//   const fetchPosts = useCallback(async () => {
//     try {
//       setLoading(true);

//       const response = await fetch('/api/fetchApifyPosts', {
//         method: 'POST',
//         body: JSON.stringify({
//           input: {
//             searchTerms: keywords,
//             sort: 'Latest',
//             maxItems: 10,
//           },
//           url: 'apidojo/twitter-scraper-lite',
//         }),
//       });

//       const data = await response.json();
//       if (!data) return;

//       const normalizedPosts = normalizePosts(data, 'twitter');

//       // Batch classify
//       const allClassified = [];
//       for (let i = 0; i < normalizedPosts.length; i += 10) {
//         const batch = await classifyLocations(normalizedPosts.slice(i, i + 10));
//         allClassified.push(...batch);
//       }

//       dispatch(setTwitterMentions(allClassified));
//     } catch (error) {
//       console.error('Twitter fetch failed', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [keywords, dispatch]);

//   useEffect(() => {
//     if (shouldFetch) {
//       fetchPosts();
//     }
//   }, [shouldFetch, fetchPosts]);

//   // Optional loader / debug output
//   if (loading) return <p>Loading Twitter posts...</p>;
//   if (!twitterMentions?.length) return null;

//   return null; // Or show something if needed
// };

// export default TwitterMentions;



'use client';

import { classifyLocations } from '@/lib/api/classifyLocation';
import { setTwitterMentions } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { enhancePostsWithLocation } from '@/lib/locationUtils';
import checkSearchQuery from '@/utils/checkSearchQuery';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';

const TwitterMentions = ({ keywords, search }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
  const twitterMentions = useAppSelector((state) => state.posts.twitterMentions);

  const shouldFetch = !checkSearchQuery(searchQuery, search);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('📡 Fetching Twitter mentions for:', keywords);

      const response = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            searchTerms: keywords,
            sort: 'Latest',
            maxItems: 500,
          },
          url: 'apidojo/twitter-scraper-lite',
        }),
      });

      const rawData = await response.json();
      if (!rawData) return;

      const normalizedPosts = normalizePosts(rawData, 'twitter');
      // const allClassified = [];
      // const allLocations = [];

      for (let i = 0; i < normalizedPosts.length; i += 10) {
        const batch = await classifyLocations(normalizedPosts.slice(i, i + 10));
        const postsWtihlocations = await enhancePostsWithLocation(batch);
        dispatch(setTwitterMentions(postsWtihlocations));

        // allLocations.push(...postsWtihlocations);
        // allClassified.push(...postsWtihlocations);
      }

      // console.log('🔍 Filtered posts by location:', allLocations)
      // console.log('🗺️ Classified posts:', allClassified);

      // dispatch(setTwitterMentions(allClassified));
    } catch (err) {
      console.error('❌ Twitter fetch error:', err);
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

export default TwitterMentions;
