'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setDarkWebPosts } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { useCallback } from 'react';


const DarkWebSearch = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const darkWebPosts = useAppSelector((state) => state.posts.darkWebPosts);

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const darkWebSearchRes = await fetch('/api/darkWebSearch', {
        method: 'POST',
        body: JSON.stringify({
          keyword: keyword
        }),
      });

      if (!darkWebSearchRes.ok) {
        setLoading(false);
        return;
      }

      const darkWebSearchData = await darkWebSearchRes.json();
      // console.log('darkWebSearchData', darkWebSearchData);

      if (!darkWebSearchData || darkWebSearchData.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(
        darkWebSearchData || [],
        'darkWebPosts',
        'darkWebSearch',
      );

      console.log('normalizedPosts', normalizedPosts);

      const classifiedPosts = await classifyPosts(normalizedPosts);
      dispatch(setDarkWebPosts(classifiedPosts));

      setPosts(classifiedPosts.slice(0, 3));
    } catch (error) {
      console.error('Request failed:', error);
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
  }, [search, searchQuery, fetchPosts, darkWebPosts]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Dark Web Search'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Dark Web Search</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default DarkWebSearch;
