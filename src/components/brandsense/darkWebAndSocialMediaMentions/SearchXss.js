'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import {
  setSearchExploitMentions,
  setSearchXss,
} from '@/lib/features/posts/postsSlices';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const SearchXss = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const postsMentions = useAppSelector((state) => state.posts.searchXss);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
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
            url: 'http://107.189.26.43:5003/search_xss',
          }),
        });

        const postsResponse = await postsRes.json();
        // console.log('search xss posts: ', postsResponse);
        if (!postsResponse || postsResponse?.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedPosts = normalizePosts(postsResponse, 'searchXss');
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
        dispatch(setSearchXss(classifiedPosts));

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Search API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === search) {
      setPosts(postsMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [keyword, search, searchQuery, postsMentions, dispatch]);

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
