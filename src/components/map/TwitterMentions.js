'use client';
import { classifyLocations } from '@/lib/api/classifyLocation';
import { setTwitterMentions } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import checkSearchQuery from '@/utils/checkSearchQuery';

const TwitterMentions = ({ keywords, search }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
  const twitterMentions = useAppSelector(
    (state) => state.posts.twitterMentions,
  );

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      let initialResponse = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            searchTerms: keywords,
            sort: 'Latest',
            maxItems: 100,
          },
          url: 'apidojo/twitter-scraper-lite',
        }),
      });

      let initialPosts = await initialResponse.json();
      // console.log(initialPosts);
      
      if (!initialPosts) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(initialPosts, 'twitter');

      // Process posts in batches of 10 for location classification
      for (let i = 0; i < normalizedPosts.length; i += 10) {
        const classifiedPosts = await classifyLocations(
          normalizedPosts.slice(i, i + 10),
        );
        dispatch(setTwitterMentions(classifiedPosts));
      }

    } catch (error) {
      console.error('Twitter API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keywords, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(twitterMentions);
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, twitterMentions, fetchPosts]);

  if (!posts || posts.length === 0) {
    return null;
  }

  return null;
};

export default TwitterMentions;
