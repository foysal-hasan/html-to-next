// 'use client';
// import { classifyLocations } from '@/lib/api/classifyLocation';
// import { setFacebookMentions } from '@/lib/features/posts/mapPagePostsSlices';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import normalizePosts from '@/utils/normalizePosts';
// import { useCallback, useEffect, useState } from 'react';
// import checkSearchQuery from '@/utils/checkSearchQuery';

// const FacebookMentions = ({ keyword, search }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);

//   const facebookMentions = useAppSelector(
//     (state) => state.posts.facebookMentions,
//   );

//   const dispatch = useAppDispatch();

//   const fetchPosts = useCallback(async () => {
//     try {
//       setLoading(true);
//       let initialResponse = await fetch('/api/facebookPosts', {
//         method: 'POST',
//         body: JSON.stringify({
//           keyword: keyword,
//         }),
//       });

//       let initialPosts = await initialResponse.json();
//       if (!initialPosts) {
//         setLoading(false);
//         return;
//       }

//       const normalizedPosts = normalizePosts(
//         initialPosts?.results,
//         'facebook',
//       );

//       // Process posts in batches of 10 for location classification
//       for (let i = 0; i < normalizedPosts.length; i += 10) {
//         const classifiedPosts = await classifyLocations(
//           normalizedPosts.slice(i, i + 10),
//         );
//         dispatch(setFacebookMentions(classifiedPosts));
//       }

//       // Continue fetching if there are more posts
//       let count = initialPosts?.results?.length;
//       while (initialPosts?.cursor && count < 100) {
//         initialResponse = await fetch('/api/facebookPosts', {
//           method: 'POST',
//           body: JSON.stringify({
//             keyword: keyword,
//             cursor: initialPosts.cursor,
//           }),
//         });

//         initialPosts = await initialResponse.json();
//         if (!initialPosts) break;

//         const morePosts = normalizePosts(
//           initialPosts?.results,
//           'facebook',
//         );

//         // Process additional posts in batches
//         for (let i = 0; i < morePosts.length; i += 10) {
//           const classifiedPosts = await classifyLocations(
//             morePosts.slice(i, i + 10),
//           );
//           dispatch(setFacebookMentions(classifiedPosts));
//         }

//         count += initialPosts?.results?.length;
//       }

//     } catch (error) {
//       console.error('Facebook API Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [keyword, dispatch]);

//   useEffect(() => {
//     if (checkSearchQuery(searchQuery, search)) {
//       setPosts(facebookMentions);
//     } else {
//       fetchPosts();
//     }
//   }, [search, searchQuery, facebookMentions, fetchPosts]);

//   if (!posts || posts.length === 0) {
//     return null;
//   }

//   return null;
// };

// export default FacebookMentions;


'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { classifyLocations } from '@/lib/api/classifyLocation';
import { setFacebookMentions } from '@/lib/features/posts/mapPagePostsSlices';
import normalizePosts from '@/utils/normalizePosts';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { enhancePostsWithLocation } from '@/lib/locationUtils';

const FacebookMentions = ({ keywords, search }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
  const facebookMentions = useAppSelector((state) => state.posts.facebookMentions);

  const shouldFetch = !checkSearchQuery(searchQuery, search);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      // let allPosts = [];
      let cursor = null;
      let totalCount = 0;

      do {
        const response = await fetch('/api/facebookPosts', {
          method: 'POST',
          body: JSON.stringify({
            keyword: keywords,
            ...(cursor && { cursor }),
          }),
        });

        const data = await response.json();
        if (!data || !data.results?.length) break;

        const normalized = normalizePosts(data.results, 'facebook');
        cursor = data.cursor;
        totalCount += normalized.length;

        for (let i = 0; i < normalized.length; i += 10) {
          const batch = await classifyLocations(normalized.slice(i, i + 10));
          const enhanced = await enhancePostsWithLocation(batch);
          // allPosts.push(...enhanced);
          dispatch(setFacebookMentions(enhanced));
        }
      } while (cursor && totalCount < 100);

      // dispatch(setFacebookMentions(allPosts));
    } catch (error) {
      console.error('❌ Facebook API Error:', error);
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

export default FacebookMentions;
