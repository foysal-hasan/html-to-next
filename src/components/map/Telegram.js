// 'use client';
// import { classifyLocations } from '@/lib/api/classifyLocation';
// import { setTelegramMentions } from '@/lib/features/posts/mapPagePostsSlices';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import normalizePosts from '@/utils/normalizePosts';
// import { useCallback, useEffect, useState } from 'react';
// import checkSearchQuery from '@/utils/checkSearchQuery';

// const TelegramMentions = ({ keyword, search }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);

//   const dispatch = useAppDispatch();
//   // console.log('from telegram page: ', keyword);

//   const telegramMentions = useAppSelector(
//     (state) => state.posts.telegramMentions,
//   )
 
//   // wrap in useCallback to prevent re-rendering
//   const fetchTelegramPosts = useCallback(async () => {

//     console.log('fetching telegram posts');
//     try {
//       setLoading(true);
//       const res = await fetch('/api/telegramPosts', {
//         method: 'POST',
//         body: JSON.stringify({
//           keyword,
//         }),
//       });
//       const rawPosts = await res.json();
//       // console.log('telegram posts', rawPosts);
//       if (!rawPosts || rawPosts.length === 0) {
//         setLoading(false);
//         return;
//       }

//       const normalizedPosts = normalizePosts(rawPosts, 'telegram');
//       // console.log('normalized: ', normalizedPosts);

//       // write a for loop to classify 10 posts at a time
//       for (let i = 0; i < normalizedPosts.length; i += 10) {
//         const classifiedPosts = await classifyLocations(
//           normalizedPosts.slice(i, i + 10),
//         );
//         // console.log('classifiedPosts', classifiedPosts);
//         dispatch(setTelegramMentions(classifiedPosts));
//       }

//     } catch (error) {
//       console.error('Telegram API Error:', error);
//     } finally {
//       setLoading(false);
//     }
//     //
//   }, [keyword, dispatch]);

//   useEffect(() => {

//     console.log('searchQuery', searchQuery);
//     console.log('search', search);
    
//     if (checkSearchQuery(searchQuery, search)) {
//       setPosts(telegramMentions.slice(0, 3));
//     } else {
//       fetchTelegramPosts();
//     }
//   }, [
//     keyword,
//     search,
//     searchQuery,
//     telegramMentions,
//     dispatch,
//     fetchTelegramPosts,
//   ]);

//   // if (loading) return <SectionLoader sectionTitle={'Telegram Mentions'} />;

//   if (!posts || posts.length === 0 || onlyData) {
//     return null;
//   }

//   return null;
// }
// export default TelegramMentions;

'use client';

import { classifyLocations } from '@/lib/api/classifyLocation';
import { setTelegramMentions } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { enhancePostsWithLocation } from '@/lib/locationUtils';
import checkSearchQuery from '@/utils/checkSearchQuery';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';

const TelegramMentions = ({ keyword, search }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
  const telegramMentions = useAppSelector((state) => state.posts.telegramMentions);

  const shouldFetch = !checkSearchQuery(searchQuery, search);

  const fetchTelegramPosts = useCallback(async () => {
    try {
      setLoading(true);
      setPosts([]); // Reset local state

      const res = await fetch('/api/telegramPosts', {
        method: 'POST',
        body: JSON.stringify({ keyword }),
      });

      const rawPosts = await res.json();
      if (!rawPosts || rawPosts.length === 0) {
        setLoading(false);
        return;
      }

      const normalized = normalizePosts(rawPosts, 'telegram');

      // const allClassified = [];
      for (let i = 0; i < normalized.length; i += 10) {
        const batch = await classifyLocations(normalized.slice(i, i + 10));
        const postsWithLocations = await enhancePostsWithLocation(batch);
        dispatch(setTelegramMentions(postsWithLocations));

        // allClassified.push(...batch);
      }

      // dispatch(setTelegramMentions(allClassified));
      // setPosts(allClassified.slice(0, 3)); // Limit to 3 visible posts

    } catch (error) {
      console.error('Telegram fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (shouldFetch) {
      fetchTelegramPosts();
    } else {
      setPosts(telegramMentions.slice(0, 3)); // Show from store if already fetched
    }
  }, [shouldFetch, fetchTelegramPosts, telegramMentions]);

  // if (loading) return <p>⏳ Loading Telegram posts...</p>;
  if (!posts || posts.length === 0) return null;

  // If you want to display posts, replace this with actual render
  return null;
};

export default TelegramMentions;
