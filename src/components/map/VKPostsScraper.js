'use client';
import { classifyLocations } from '@/lib/api/classifyLocation';
import { setVkMentions } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import checkSearchQuery from '@/utils/checkSearchQuery';

const VKPostsScraper = ({ keywords, search }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);

  const vkPosts = useAppSelector((state) => state.posts.vkMentions);

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      let initialResponse = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            keywords: keywords,
          },
          url: 'easyapi/vk-posts-scraper',
        }),
      });

      let initialPosts = await initialResponse.json();
      // console.log('initialPosts', initialPosts);
      
      if (!initialPosts) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(initialPosts, 'vk');

      // Process posts in batches of 10 for location classification
      for (let i = 0; i < normalizedPosts.length; i += 10) {
        const classifiedPosts = await classifyLocations(
          normalizedPosts.slice(i, i + 10)
        );
        dispatch(setVkMentions(classifiedPosts));
      }

    } catch (error) {
      console.error('VK Posts API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keywords, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(vkPosts);
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, vkPosts, fetchPosts]);

  if (!posts || posts.length === 0) {
    return null;
  }

  return null;
};

export default VKPostsScraper;
