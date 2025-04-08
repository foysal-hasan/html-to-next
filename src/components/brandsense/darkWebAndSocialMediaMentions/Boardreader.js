'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setBoardreader } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import checkSearchQuery from '@/utils/checkSearchQuery';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const Boardreader = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const darkWebXSSMentions = useAppSelector((state) => state.posts.boardreader);

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const darkwebXssRes = await fetch('/api/boardreader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword,
        }),
      });

      let darkwebXssPosts = await darkwebXssRes.json();
      darkwebXssPosts = darkwebXssPosts?.posts;
      console.log('boardreader posts: ', darkwebXssPosts);

      if (!darkwebXssPosts || darkwebXssPosts.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedXssPosts = normalizePosts(darkwebXssPosts, 'darkwebxss');
      console.log('normalized Xss: ', normalizedXssPosts);

      const classifiedXssPosts = await classifyPosts(normalizedXssPosts);
      console.log(classifiedXssPosts);

      setPosts(classifiedXssPosts?.slice(0, 3));
      dispatch(setBoardreader(classifiedXssPosts));
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
  if (loading) return <SectionLoader sectionTitle={'Boardreader'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Boardreader</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default Boardreader;
