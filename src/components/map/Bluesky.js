'use client';
import { classifyLocations } from '@/lib/api/classifyLocation';
import { setBlueSkyMentions } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import checkSearchQuery from '@/utils/checkSearchQuery';

const BlueSky = ({ keyword, search }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);

  const blueSkyMentions = useAppSelector(
    (state) => state.posts.blueSkyMentions,
  );

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      let initialResponse = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            queries: keyword,
            limit: 100,
            sort: 'latest',
            proxyConfiguration: {
              useApifyProxy: true,
              apifyProxyGroups: [],
            },
          },
          url: 'U9JtSIIjR6gyldBIN',
        }),
      });

      let initialPosts = await initialResponse.json();
      if (!initialPosts) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(
        initialPosts,
        'bluesky',
      );

      // Process posts in batches of 10 for location classification
      for (let i = 0; i < normalizedPosts.length; i += 10) {
        const classifiedPosts = await classifyLocations(
          normalizedPosts.slice(i, i + 10),
        );
        dispatch(setBlueSkyMentions(classifiedPosts));
      }

    } catch (error) {
      console.error('BlueSky API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(blueSkyMentions);
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, blueSkyMentions, fetchPosts]);

  if (!posts || posts.length === 0) {
    return null;
  }

  return null;
};

export default BlueSky;
