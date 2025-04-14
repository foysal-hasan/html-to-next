'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setDarkWebPosts } from '@/lib/features/posts/postsSlices';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import checkSearchQuery from '@/utils/checkSearchQuery';

const SearchXss = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  // const postsMentions = useAppSelector((state) => state.posts.searchXss);
  const darkWebPosts = useAppSelector((state) => state.posts.darkWebPosts);

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      // facebook
      const postsRes = await fetch('/api/stream', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            keyword: keyword,
            start_date: '2025-01-01',
            end_date: new Date().toISOString().split('T')[0],
          },
          url: 'http://45.61.160.154:5000/search_xss',
        }),
      });

      const postsResponse = await postsRes.json();
      // console.log('search xss posts: ', postsResponse);
      if (!postsResponse || postsResponse?.length === 0) {
        setLoading(false);
        return;
      }

      console.log(postsResponse);

      const normalizedPosts = normalizePosts(postsResponse, 'darkWebPosts');
      // console.log('normalized: ', normalizedPosts);

      // content is array make it string
      normalizedPosts?.forEach((post) => {
        if (Array.isArray(post?.content)) {
          post.content = post?.content?.join(' ');
        }
      });
      // console.log('normalizedPosts', normalizedPosts);

      const classifiedPosts = await classifyPosts(normalizedPosts);

      // console.log('classifiedPosts', classifiedPosts);
      dispatch(setDarkWebPosts(classifiedPosts));

      setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
    } catch (error) {
      console.error('Search API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(darkWebPosts.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, darkWebPosts, fetchPosts]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Search XSS'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  // if posts is not array, return null
  if (!Array.isArray(posts) || posts.length === 1) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Search XSS</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default SearchXss;
