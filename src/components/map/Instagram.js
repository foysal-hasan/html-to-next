'use client';
import { classifyLocations } from '@/lib/api/classifyLocation';
import { setInstagramMentions } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { enhancePostsWithLocation } from '@/lib/locationUtils';

const InstagramMentions = ({ keywords, search }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);

  const instagramMentions = useAppSelector(
    (state) => state.posts.instagramMentions,
  );
  const dispatch = useAppDispatch();

  const fetchInstagramPosts = useCallback(async () => {
    try {
      setLoading(true);
      let initialResponse = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            hashtags: keywords,
            resultsType: 'posts',
            resultsLimit: 500,
          },
          url: 'apify/instagram-hashtag-scraper',
        }),
      });

      let initialPosts = await initialResponse.json();
      // console.log("initail posts: ", initialPosts);
      if (!initialPosts) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(initialPosts || [], 'Instagram');

      // Process posts in batches of 10 for location classification
      for (let i = 0; i < normalizedPosts.length; i += 10) {
        const classifiedPosts = await classifyLocations(
          normalizedPosts.slice(i, i + 10),
        );
        const postsWithLocations = await enhancePostsWithLocation(
          classifiedPosts,
        );
        dispatch(setInstagramMentions(postsWithLocations));
      }

    } catch (error) {
      console.error('Instagram API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keywords, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(instagramMentions);
    } else {
      fetchInstagramPosts();
    }
  }, [search, searchQuery, instagramMentions, fetchInstagramPosts]);

  if (!posts || posts.length === 0) {
    return null;
  }

  return null;
};

export default InstagramMentions;
