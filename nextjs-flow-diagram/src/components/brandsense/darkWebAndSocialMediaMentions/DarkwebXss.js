'use client';
import { classifyPosts } from '@/lib/api/classify';
import { setDarkWebXSSMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import SectionLoader from '@/components/SectionLoader';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { useCallback } from 'react';

const DarkwebXSSPosts = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const darkWebXSSMentions = useAppSelector(
    (state) => state.posts.darkWebXSSMentions,
  );

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      // Dark Web - XSS
      const darkwebXssRes = await fetch('/api/darkWebPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            keyword: keyword,
            start_date: '2025-01-01',
            end_date: new Date().toISOString().split('T')[0],
          },
          url: 'http://172.86.116.124:5004/search_xss',
        }),
      });
      const darkwebXssPosts = await darkwebXssRes.json();
      // console.log('darkweb Xss posts: ', darkwebXssPosts);

      if (!darkwebXssPosts || darkwebXssPosts.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedXssPosts = normalizePosts(darkwebXssPosts, 'darkwebxss');
      // console.log('normalized Xss: ', normalizedXssPosts);

      const classifiedXssPosts = await classifyPosts(normalizedXssPosts);
      // console.log('classifiedXssPosts', classifiedXssPosts);
      dispatch(setDarkWebXSSMentions(classifiedXssPosts));

      setPosts((prevPosts) => [
        ...prevPosts,
        ...classifiedXssPosts.slice(0, 3),
      ]); // Show only 2-3 posts
    } catch (error) {
      console.error('Dark Web API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(darkWebXSSMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, darkWebXSSMentions, fetchPosts]);

  if (onlyData) {
    return null;
  }
  if (loading)
    return <SectionLoader sectionTitle={'Darkweb XSS Posts Mentions'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Darkweb XSS Posts Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default DarkwebXSSPosts;
