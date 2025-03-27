'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setVkPosts } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const VKPostsScraper = ({ keywords, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const vkPosts = useAppSelector((state) => state.posts.vkPosts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const vkRes = await fetch('/api/fetchApifyPosts', {
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

        if (!vkRes.ok) {
          setLoading(false);
          return;
        }

        const vkData = await vkRes.json();

        if (!vkData || vkData.length === 0) {
          setLoading(false);
          return;
        }

        // console.log('vkData', vkData);

        const normalizedPosts = normalizePosts(vkData, 'vk');
        const classifiedPosts = await classifyPosts(normalizedPosts);

        // console.log('classifiedPosts', classifiedPosts);

        dispatch(setVkPosts(classifiedPosts));
        setPosts(classifiedPosts.slice(0, 3));
      } catch (error) {
        console.error('VK Posts API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === search) {
      setPosts(vkPosts.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [keywords, search, searchQuery, dispatch, vkPosts]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'VK Posts'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>VK Posts</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default VKPostsScraper;
