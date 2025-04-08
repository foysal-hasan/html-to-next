'use client';
import { classifyPosts } from '@/lib/api/classify';
import { setDarkWebPosts } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import SectionLoader from '@/components/SectionLoader';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { useCallback } from 'react';

const Threads = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  // const threadsMentions = useAppSelector((state) => state.posts.threads);
  const darkWebPosts = useAppSelector((state) => state.posts.darkWebPosts);

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      // console.log('keyword: ', keyword);

      const threadsRes = await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword,
        }),
      });

      let threadsPosts = await threadsRes.json();
      // console.log('threads posts: ', threadsPosts);

      console.log(threadsPosts);

      threadsPosts = threadsPosts?.posts;

      if (!threadsPosts || threadsPosts.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedThreadsPosts = normalizePosts(
        threadsPosts,
        'darkWebPosts',
        'threads',
      );
      // console.log('normalized threads: ', normalizedThreadsPosts);

      const classifiedThreadsPosts = await classifyPosts(
        normalizedThreadsPosts,
      );
      // console.log('classifiedThreadsPosts', classifiedThreadsPosts);
      dispatch(setDarkWebPosts(classifiedThreadsPosts));

      // setPosts((prevPosts) => [
      //   ...prevPosts,
      //   ...classifiedThreadsPosts.slice(0, 3),
      // ]); // Show only 2-3 posts

      setPosts(classifiedThreadsPosts.slice(0, 3));
    } catch (error) {
      console.error('Dark Web API Error:', error);
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
  }, [searchQuery, darkWebPosts, search, fetchPosts]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Threads'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Threads</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default Threads;
