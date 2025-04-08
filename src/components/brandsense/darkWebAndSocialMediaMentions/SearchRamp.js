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

const SearchRamp = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  // const breachforumPosts = useAppSelector((state) => state.posts.breachforum);
  const darkWebPosts = useAppSelector((state) => state.posts.darkWebPosts);

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const searchRampRes = await fetch('/api/darkWebPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            keyword: keyword,
            start_date: '2025-01-01',
            end_date: new Date().toISOString().split('T')[0],
          },
          url: 'http://107.189.26.43:5005/search_ramp',
        }),
      });

      if (!searchRampRes.ok) {
        setLoading(false);
        return;
      }

      const searchRampData = await searchRampRes.json();
      // console.log('searchRampData', searchRampData);

      if (!searchRampData || searchRampData.length === 0) {
        setLoading(false);
        return;
      }

      // const normalizedPosts = normalizePosts(
      //   breachforumData?.all_posts || [],
      //   'breachforum',
      // );

      const normalizedPosts = normalizePosts(
        searchRampData || [],
        'darkWebPosts',
        'searchRamp',
      );

      // console.log('normalizedPosts', normalizedPosts);

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
  if (loading) return <SectionLoader sectionTitle={'Search Ramp'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Search Ramp</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default SearchRamp;
