'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setFacebookMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { useCallback } from 'react';

const FacebookMentionsAll = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const facebookMentions = useAppSelector(
    (state) => state.posts.facebookMentions,
  );

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      // Then fetch all posts in the background
      const fullResponse = await fetch('/api/facebookPosts', {
        method: 'POST',
        body: JSON.stringify({
          keyword: keyword,
          fetchAll: true,
        }),
      });

      let allPosts = await fullResponse.json();
      allPosts = allPosts?.posts;

      if (allPosts && allPosts.length > 0) {
        // Normalize and classify all posts
        const allNormalizedPosts = normalizePosts(allPosts, 'facebook');
        const allClassifiedPosts = await classifyPosts(allNormalizedPosts);

        // Store all posts in Redux
        dispatch(setFacebookMentions(allClassifiedPosts));
      }
    } catch (error) {
      console.error('Facebook API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(facebookMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, facebookMentions, fetchPosts]);

  if (onlyData) {
    return null;
  }
  // if (loading) return <SectionLoader sectionTitle={'Facebook Mentions'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return null;
};

export default FacebookMentionsAll;
