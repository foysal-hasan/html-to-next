'use client';
import { classifyPosts } from '@/lib/api/classify';
import { setThreads } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import SectionLoader from '@/components/SectionLoader';

const Threads = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const threadsMentions = useAppSelector((state) => state.posts.threads);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
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
        threadsPosts = threadsPosts?.posts;

        if (!threadsPosts || threadsPosts.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedThreadsPosts = normalizePosts(threadsPosts, 'threads');
        // console.log('normalized threads: ', normalizedThreadsPosts);

        const classifiedThreadsPosts = await classifyPosts(
          normalizedThreadsPosts,
        );
        // console.log('classifiedThreadsPosts', classifiedThreadsPosts);
        dispatch(setThreads(classifiedThreadsPosts));

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
    };

    if (searchQuery === search) {
      setPosts(threadsMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [
    keyword,
    searchQuery,
    threadsMentions,
    dispatch,
    onlyData,
    loading,
    search,
  ]);

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
