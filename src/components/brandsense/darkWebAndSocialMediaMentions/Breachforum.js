'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setBreachforum } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const Breachforum = ({ keyword, domain, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const breachforumPosts = useAppSelector((state) => state.posts.breachforum);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const breachforumRes = await fetch('/api/breachforum', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: keyword,
          }),
        });

        if (!breachforumRes.ok) {
          setLoading(false);
          return;
        }

        const breachforumData = await breachforumRes.json();

        if (!breachforumData || breachforumData.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedPosts = normalizePosts(
          breachforumData?.all_posts || [],
          'breachforum',
        );

        const classifiedPosts = await classifyPosts(normalizedPosts);
        dispatch(setBreachforum(classifiedPosts));

        setPosts(classifiedPosts.slice(0, 3));
      } catch (error) {
        console.error('Request failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === domain) {
      setPosts(breachforumPosts.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [keyword, domain, searchQuery, dispatch, breachforumPosts]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Breachforum'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Breachforum</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default Breachforum;
